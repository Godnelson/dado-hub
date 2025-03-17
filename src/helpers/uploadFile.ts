import fs from "fs"
export const uploadFile = async (buffer: any, filename: string) => {
    fs.writeFile("storage/"+filename, buffer, ()=>{})
}
