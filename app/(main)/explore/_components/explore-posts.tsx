import { Models } from "appwrite";
import Image from "next/image";
import Link from "next/link";

const ExplorePosts = ({ post } : { post: Models.Document}) => {
  return (
    <>
      <li className="shrink-0 w-[124px] h-[124px] scale-[.98]">
        <Link href={`/post/${post.$id}`}>
        <Image src={post.imageUrl} alt="posts" width={124} height={124} className="object-cover h-full w-full" />
        </Link>
      </li>
    </>
  );
};
export default ExplorePosts;
