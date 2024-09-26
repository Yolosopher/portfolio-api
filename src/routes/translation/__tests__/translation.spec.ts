import { server, setup, teardown } from "@/__tests__/global";
import CONFIG from "@/config";
import { loginResponseSchema } from "@/lib/zod/user";
import userService from "@/services/user";
import supertest from "supertest";

beforeAll(setup);
afterAll(teardown);

describe("Translations", () => {
    let super_admin_auth_token = "";

    beforeAll(async () => {
        await userService.initializeSuperAdmin();
        const super_admin_login_payload = {
            email: CONFIG.default_super_admin.email,
            password: CONFIG.default_super_admin.password,
        };
        const res = await supertest(server)
            .post("/auth/login")
            .send(super_admin_login_payload);

        const zodResult = loginResponseSchema.safeParse(res.body);
        if (zodResult.success) {
            super_admin_auth_token = res.body.current_user.auth_token;
        } else {
            throw new Error("loginResponseSchema failed in superadmin");
        }
    });

    let firstFetchedVersion: string = "";

    let lastFetchedVersion: string = "";

    it("should fetch translations", async () => {
        const res = await supertest(server).get("/translation");

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Translations fetched successfully");
        expect(res.body.version).toBeDefined();

        lastFetchedVersion = res.body.version;
        firstFetchedVersion = res.body.version;
    });

    it("should compare version with success", async () => {
        const res = await supertest(server)
            .post("/translation")
            .send({ version: lastFetchedVersion });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Version compared successfully");
        expect(res.body.versionsMatch).toBe(true);
    });

    const payload = {
        key: "test_key",
        values: {
            en: "test_value555",
        },
    };
    it("should update translation", async () => {
        const res = await supertest(server)
            .patch("/translation")
            .set("Authorization", `Bearer ${super_admin_auth_token}`)
            .send(payload);

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Translation updated successfully");
    });

    it("should fetch translations with new test key and value", async () => {
        const res = await supertest(server).get("/translation");

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Translations fetched successfully");
        expect(res.body.version !== lastFetchedVersion).toBe(true);

        lastFetchedVersion = res.body.version;

        const translationsMap = new Map(Object.entries(res.body.data));

        expect(translationsMap.has(payload.key.toUpperCase())).toBe(true);
        expect(res.body.data[payload.key.toUpperCase()].en).toBe(
            payload.values.en
        );
    });

    it("comparing versions should return false", async () => {
        const res = await supertest(server)
            .post("/translation")
            .send({ version: firstFetchedVersion });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Version compared successfully");
        expect(res.body.versionsMatch).toBe(false);
    });

    it("should delete translation", async () => {
        const res = await supertest(server)
            .delete("/translation")
            .set("Authorization", `Bearer ${super_admin_auth_token}`)
            .query({ key: payload.key });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Translation deleted successfully");
    });

    it("comparing versions should return false 2", async () => {
        const res = await supertest(server)
            .post("/translation")
            .send({ version: lastFetchedVersion });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Version compared successfully");
        expect(res.body.versionsMatch).toBe(false);
    });
});
