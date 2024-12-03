import {auth} from "@/auth";

 const Profile = async () => {
    const session = await auth();
    console.log("Session data:", session);
    return <div>Profile page</div>;
}

export default Profile;
