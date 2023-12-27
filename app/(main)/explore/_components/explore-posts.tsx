import { Models } from "appwrite";
import Image from "next/image";
import Link from "next/link";

const ExplorePosts = ({ post } : { post: Models.Document}) => {
  return (
    <>
      <li className="sm:w-[124px] aspect-square sm:h-[124px] shrink scale-95 sm:scale-[.98]">
        <Link href={`/post/${post.$id}`}>
          <Image loading="lazy" src={post.imageUrl} alt="posts" width={124} height={124} className="object-cover h-full w-full" />
        </Link>
      </li>
    </>
  );
};
export default ExplorePosts;
