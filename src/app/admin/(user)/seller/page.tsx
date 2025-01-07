import DashboardCardItem from "@/app/admin/dashboard/cardItem";
import Seller from "@/app/admin/(user)/seller/seller";
import {sendRequest} from "@/utils/apis";
import {auth} from "@/auth";

interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function UserPage(props:IProps) {
    const session = await auth()
    const current = props?.searchParams?.page ?? 1;
    const limit = props?.searchParams?.limit ?? 12;
    const sort = props?.searchParams?.sort ?? '';
    const search = props?.searchParams?.search ?? '';

    const data = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/supplier`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        },
        queryParams: {
            page: current,
            limit: limit,
            sort: sort,
            search: search
        },
        nextOption: {
            next: {tags: ['list-users']}
        }
    });

    return (
        <>
            <div className="grid grid-cols-4 gap-6">
                {data?.data?.suppliers.map((seller) => (
                    <Seller key={seller.id} seller={seller} />
                ))}
            </div>
            <div className="text-center text-blue-500 mt-4">
                <a href="#">More...</a>
            </div>

        </>
    );
}