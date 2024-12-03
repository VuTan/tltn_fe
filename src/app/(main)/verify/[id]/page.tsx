import Verify from "@/app/(main)/verify/[id]/Verify";

const VerifyPage = ({params}: { params: { id: string } }) => {
    const {id} = params;

    return (
        <div className="flex justify-center content-center my-24">
            <div className="w-[22rem] min-w-64 p-4 border-2 rounded-sm">
                <h1 className="font-extrabold text-3xl">Exclusive</h1>
                <Verify id={id}/>
            </div>
        </div>
    )
}

export default VerifyPage;