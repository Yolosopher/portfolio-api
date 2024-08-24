import { server, setup, teardown } from "@/__tests__/global";
import CONFIG from "@/config";
import { loginResponseSchema } from "@/lib/zod/user";
import userService from "@/services/user";
import supertest from "supertest";

beforeAll(setup);
afterAll(teardown);

describe("Projects", () => {
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
    it("should create 2 projects", async () => {
        const payload = {
            name: "project1",
            description: "description1",
        };
        const payload2 = {
            name: "project2",
            description: "description2",
        };

        const res = await supertest(server)
            .post("/project")
            .set("Authorization", `Bearer ${super_admin_auth_token}`)
            .send(payload);
        const res2 = await supertest(server)
            .post("/project")
            .set("Authorization", `Bearer ${super_admin_auth_token}`)
            .send(payload2);

        expect(res.status).toBe(201);
        expect(res2.status).toBe(201);
    });

    it("should make the project hidden", async () => {
        const res = await supertest(server)
            .patch("/project/project1")
            .set("Authorization", `Bearer ${super_admin_auth_token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.hidden).toBe(true);
    });
    it("should fetch only visible projects", async () => {
        const res = await supertest(server)
            .get("/project?hidden=false")
            .set("Authorization", `Bearer ${super_admin_auth_token}`);

        expect(res.status).toBe(200);
        expect(
            res.body.data.every((x: any) => x.hidden === false)
        ).toBeTruthy();
    });
    it("should fetch only hidden projects", async () => {
        const res = await supertest(server)
            .get("/project?hidden=true")
            .set("Authorization", `Bearer ${super_admin_auth_token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.every((x: any) => x.hidden === true)).toBeTruthy();
    });
    it("should fetch both hidden and visible projects", async () => {
        const res = await supertest(server)
            .get("/project")
            .set("Authorization", `Bearer ${super_admin_auth_token}`);

        expect(res.status).toBe(200);

        console.log(
            res.body.data.map((x: any) => ({ name: x.name, hidden: x.hidden }))
        );

        expect(res.body.data.some((x: any) => x.hidden === true)).toBeTruthy();
        expect(res.body.data.some((x: any) => x.hidden === false)).toBeTruthy();
    });
    it("should fetch both hidden and visible projects 2", async () => {
        const res = await supertest(server)
            .get("/project?hidden=fadf")
            .set("Authorization", `Bearer ${super_admin_auth_token}`);

        expect(res.status).toBe(200);

        expect(res.body.data.some((x: any) => x.hidden === true)).toBeTruthy();
        expect(res.body.data.some((x: any) => x.hidden === false)).toBeTruthy();
    });
    it("should make the project visible", async () => {
        const res = await supertest(server)
            .patch("/project/project1")
            .set("Authorization", `Bearer ${super_admin_auth_token}`);

        expect(res.status).toBe(200);
        expect(res.body.data.hidden).toBe(false);
    });
});
