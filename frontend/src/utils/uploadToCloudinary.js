export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,{
        method:"POST",
        body:formData,
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.message || "Upload failed");
    return data.secure_url;
}