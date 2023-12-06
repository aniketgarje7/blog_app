import React, { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsByUsername, selectProfileUser, selectUserBlogs,} from "../../../store/slices/UserSlice";
import BlogCard from "../Blog/BlogCard";
import ButtonLoader from "../../Elements/ButtonLoader";
import { selectUser } from "../../../store/slices/AuthSlice";
import { useParams } from "react-router-dom";
const Profile = () => {
  const [isLoading, setIloading] = useState(false);
  const dispatch = useDispatch();
  const blogs = useSelector(selectUserBlogs);
  const user = useSelector(selectUser);
  const profileUser = useSelector(selectProfileUser);
  const {username} = useParams();
  useEffect(() => {
    if (!user) {
      return;
    }
    const data = { page: 0, username:username};
    setIloading(true);
    dispatch(getBlogsByUsername(data)).then(() => {
      setIloading(false);
    });
  }, [username,user]);
  return (
    <div>
      <div className="p-3">Profile</div>
      <div className="profile_info">
        <div className="profile_bg_image"></div>
        <div className="profile_user_image">
          {/* <img src='' alt='profile photo'/> */}
          <span>
            <IoPerson className="person_icon" />
          </span>
        </div>
        <div className="px-2">
          <div className="profile_name">{profileUser?.name}</div>
          <div className="profile_usernalme">@{profileUser?.username}</div>
        </div>
        <div className="profile_follow">
          <span>
            <span className="number">{profileUser?.followers}</span> Followers
          </span>
          <span>
            <span className="number">{profileUser?.following}</span> Following
          </span>
        </div>
        <div className="profile_posts">
          <span>Posts <span className="number">{blogs?.length}</span></span>
        </div>
      </div>
      <div className="profile_user_posts">
        {isLoading ? (
          <ButtonLoader />
        ) : (
          <div>
            {blogs.map((blog, id) => (
              <div key={id}>
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
