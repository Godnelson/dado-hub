import fs from "fs"
export const uploadFile = async (buffer: any, filename: string) => {
    const path = "storage/"+filename
    await Promise.all([
        fs.writeFile("storage/"+filename, buffer, ()=>{})
    ])
    return path
}
