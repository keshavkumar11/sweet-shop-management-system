export async function loginUser(credentials) {
    const res = await fetch("http://localhost:5000/api/auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    return data;
}

export async function registerUser(userData) {
    const res = await fetch("http://localhost:5000/api/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Registration failed");
    }

    return data;
}