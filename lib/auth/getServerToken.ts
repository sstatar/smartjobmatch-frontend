"use server";

import { cookies } from "next/headers";

export async function getServerToken() {
    return (await cookies()).get("token")?.value;
}
