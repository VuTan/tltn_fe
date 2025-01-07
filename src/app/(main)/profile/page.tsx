import {auth} from "@/auth";
import {sendRequest} from "@/utils/apis";
import ContentProfile from "@/app/(main)/profile/Content";

const Profile = async () => {
    const session = await auth();
    const email = session?.user.email ;
    const _id = session?.user._id ;
    const userData = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/users/${email}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        }

    })

    const orderData = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/order/user/${_id}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        }
    })


    return (
        <div className="px-24 py-12">
            <ContentProfile user={userData.data} order={orderData} session={session}/>
        </div>
    );
}

export default Profile;
