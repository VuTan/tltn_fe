// app/users/page.tsx
import {auth} from "@/auth";
import Buyer from "./buyer";
import DashboardCardItem from "@/app/admin/dashboard/cardItem";
import {sendRequest} from "@/utils/apis";
import PaginationComponent from "@/conponents/Pagination";
import TableHeader from "@/app/admin/(user)/buyer/TableHeader";
import SearchBar from "@/app/admin/(user)/buyer/SearchBar";

interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
const header = [
    { name: "Customer Name", key: "name", align: "left", sort: true },
    { name: "Email", key: 'email', align: "left", sort: true },
    { name: "Date Created", key: 'createdAt', align: "center", sort: true },
    { name: "Account Type", align: "center", sort: false },
    { name: "Action", align: "center", sort: false },
]

export default async function UserPage(props: IProps) {
    const session = await auth();

    const current = props?.searchParams?.page ?? 1;
    const limit = props?.searchParams?.limit ?? 10;
    const sort = props?.searchParams?.sort ?? '';
    const search = props?.searchParams?.search ?? '';


    const data = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/users`,
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
            <div className="flex space-x-8">
                <DashboardCardItem/>
                <DashboardCardItem/>
                <DashboardCardItem/>
            </div>
            <div className="mt-8 bg-gray-200 p-6 bg-white">
                <div className="flex justify-between items-center my-2">
                    <h3 className="text-left text-xl font-semibold">Customer</h3>
                    <SearchBar placeholder={"Search user..."}/>
                </div>
                <TableHeader header={header}/>
                {data ? data?.data.users.map((item) => (
                    <div key={item.email} className="hover:bg-gray-100 border-b">
                        <Buyer data={item}/>
                    </div>
                )) : (
                    <div className='text-center w-2 h-2'>
                        <p>No data user...</p>
                    </div>
                )}
                <div className="flex w-full justify-end mt-4">
                    <PaginationComponent current={current} limit={limit} totalPage={data?.data.totalPages}/>
                </div>
            </div>
        </>
    );
}
