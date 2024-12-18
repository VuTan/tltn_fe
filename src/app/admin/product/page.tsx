import DashboardCardItem from "@/app/admin/dashboard/cardItem";
import SearchBar from "@/app/admin/(user)/buyer/SearchBar";
import TableHeader from "@/app/admin/(user)/buyer/TableHeader";
import PaginationComponent from "@/conponents/Pagination";
import ProductListItem from "@/app/admin/(user)/seller/detail/productListItem";
import {sendRequest} from "@/utils/apis";
import {auth} from "@/auth";
import {faBagShopping} from "@fortawesome/free-solid-svg-icons/faBagShopping";
import {faCubes} from "@fortawesome/free-solid-svg-icons/faCubes";

interface IProps {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

const header = [
    {name: "Name", key: "name", align: "left", sort: true},
    {name: "Price", key: 'price', align: "center", sort: true},
    {name: "Stock", key: 'stock', align: "center", sort: true},
    {name: "Category", align: 'center', sort: false},
    {name: "Rate", key: 'rate', align: "center", sort: true},
    {name: "Action", align: "center", sort: false},
]
export default async function AmdinPage(props: IProps) {
    const session = await auth()
    const current = props?.searchParams?.page ?? 1;
    const limit = props?.searchParams?.limit ?? 20;
    const sort = props?.searchParams?.sort ?? '';
    const search = props?.searchParams?.search ?? '';

    const dashboard = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/product/total`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.user?.access_token}`
        }
    });

    const data = await sendRequest<IBackendRes<any>>({
        url: `http://localhost:8080/api/product`,
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
            next: {tags: ['list-product']}
        }
    });

    return (
        <>
            <div className="flex space-x-8">
                <DashboardCardItem title='Total Product' value={dashboard.data.totalProducts.toLocaleString()} icon={faBagShopping}/>
                <DashboardCardItem title='In Stock' value={dashboard.data.totalStock.toLocaleString()} icon={faCubes}/>
                <DashboardCardItem/>
            </div>
            <div className="mt-8 bg-gray-200 p-6 bg-white">
                <div className="flex justify-between items-center my-2">
                    <h3 className="text-left text-xl font-semibold">Product</h3>
                    <SearchBar placeholder={"Search product..."}/>
                </div>
                <TableHeader header={header}/>
                {data && data ? data?.data?.products?.map((item) => (
                    <div key={item._id} className="hover:bg-gray-100 border-b">
                        <ProductListItem data={item}/>
                    </div>
                )) : (
                    <div className='text-center w-2 h-2'>
                        <p>No product...</p>
                    </div>
                )}
                <div className="flex w-full justify-end mt-4">
                    <PaginationComponent current={current} limit={limit} totalPage={data?.data?.totalPages}/>
                </div>
            </div>
        </>
    );
}
