import { prisma } from "@/db";
import { redirect } from "next/navigation";
// import { _getUsers } from "./_actions/users.crud";

export default async function Home() {
  redirect("/home");
  // const users = await _getUsers();
  // console.log(users);
  // return (
  //   <>
  //     <ul>
  //       {users.map((user) => (
  //         <li key={user.id}>
  //           <p>{user.name}</p>
  //           <div>Posts</div>
  //           {user.posts.map((post) => (
  //             <div key={post.id}>
  //               <p>{post.content}</p>
  //             </div>
  //           ))}
  //         </li>
  //       ))}
  //     </ul>
  //   </>
  // );
}
