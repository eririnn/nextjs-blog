import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts")

export function getPostsData() {

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(
        (fileName) => {
            const id = fileName.replace(/\.md$/, "")

            const fullPath = path.join(postsDirectory, fileName)
            const fileContents = fs.readFileSync(fullPath, "utf-8")

            const matterResult = matter(fileContents)

            console.log(matterResult);

            return {
                id,
                ...matterResult.data,
            }

        }
    )

    return allPostsData
}

export function getAllPostIds() {

    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames.map(
        (fileName) => {
            return {
                params: {
                    id: fileName.replace(/\.md$/, "")
                }
            }

        }
    )

}

export  async function getPostData(id) {

    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContent = fs.readFileSync(fullPath, "utf-8")

    const matterResult = matter(fileContent)
    console.log("matterResult::::::",matterResult);

    

    const blogContent =  await remark().use(html).process(matterResult.content)
    //console.log("blogContent::::::",blogContent);
    const blogContentHTML = blogContent.toString()
    //console.log("blogContentHTML::::::",blogContentHTML);

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }

}