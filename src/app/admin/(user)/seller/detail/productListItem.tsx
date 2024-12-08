'use client'
import {useState} from "react";
import Image from "next/image";
import Rate from "@/conponents/Rate";
import ActionMethod from "@/conponents/actionMethod";
import {handleUpdateProduct} from "@/utils/actions";
import toast from "react-hot-toast";

export default function ProductListItem({data}) {
    const [name, setName] = useState(data.name);
    const [description, setDescription] = useState(data.des?.join("\n\n") || "");
    const [stock, setStock] = useState(data.stock);
    const [price, setPrice] = useState(data.price);
    const [category, setCategory] = useState(data.category);
    const [specData, setSpecData] = useState(data.spec);


    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleStockChange = (e) => setStock(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleCategoryChange = (e) => setCategory(e.target.value);
    const handleSpecChange = (index, field, value) => {
        const updatedSpec = [...specData];
        updatedSpec[index][field] = value;
        setSpecData(updatedSpec);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            _id: data._id,
            title: name,
            base_price: price,
            describe: description,
        }
        console.log(updatedData)

        try {
            const res = await handleUpdateProduct('product', data._id, updatedData);
            if (res?.data) {
                toast.success('Update succeeded!');
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.error('Error during update:', error);
            toast.error('Update failed. Please try again.');
        }
    };


    return (
        <div className="grid grid-cols-6 text-center items-center border-b-2 py-4 last:boder-b-0">
            <div className="flex space-x-2 items-center">
                <Image src={data.imgs[0]} alt={""} width={75} height={75}/>
                <h3 className="text-left overflow-hidden text-ellipsis line-clamp-2">{data.name}</h3>
            </div>
            <p>${data.price}</p>
            <div>
                <p className="text-sm">{data.stock} item left</p>
                <p className="font-light text-sm">1256 sold</p>
            </div>
            <p>{data.category}</p>
            <div className='flex justify-center'>
                <Rate rate={data.rate}/>
                <p className='font-light'>({data.ratings})</p>
            </div>
            <ActionMethod type="product" data={data._id}>
                <>
                    <div className="flex items-center">
                        <h3 className="text-blue-600 text-xl font-bold flex-1">Product</h3>
                    </div>

                    <form className="space-y-4 mt-8" onSubmit={handleSubmit}>
                        <div className='flex space-x-6'>
                            <Image src={data.imgs[0]} alt={data.name} width={100} height={100}/>
                            <div className='w-full'>
                                <label className="text-left font-bold text-gray-800 text-sm mb-2 block">Name of the
                                    product</label>
                                <textarea
                                    placeholder="Write about the product"
                                    className="px-4 w-full py-3 bg-gray-100 text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                                    rows="5"
                                    value={name} // Lấy giá trị từ state
                                    onChange={handleNameChange} // Cập nhật khi người dùng thay đổi
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                className="text-left font-bold text-gray-800 text-sm mb-2 block">Descriptions</label>
                            <textarea
                                placeholder="Write about the product"
                                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                                rows="8"
                                value={description} // Lấy giá trị từ state
                                onChange={handleDescriptionChange} // Cập nhật khi người dùng thay đổi
                            />
                        </div>

                        <div>
                            <label className="text-left font-bold text-gray-800 text-sm mb-2 block">Stock</label>
                            <input
                                type="number"
                                placeholder="Enter quantity"
                                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                                value={stock} // Lấy giá trị từ state
                                onChange={handleStockChange} // Cập nhật khi người dùng thay đổi
                            />
                        </div>

                        <div>
                            <label className="text-left font-bold text-gray-800 text-sm mb-2 block">Selling
                                price</label>
                            <input
                                type="number"
                                placeholder="Enter price"
                                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                                value={price} // Lấy giá trị từ state
                                onChange={handlePriceChange} // Cập nhật khi người dùng thay đổi
                            />
                        </div>

                        <div>
                            <label className="text-left font-bold text-gray-800 text-sm mb-2 block">Category</label>
                            <input
                                type="text"
                                placeholder="Enter product category"
                                className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                                value={category} // Lấy giá trị từ state
                                onChange={handleCategoryChange} // Cập nhật khi người dùng thay đổi
                            />
                        </div>

                        <div>
                            <div className='space-y-2'>
                                <div className='font-bold text-left grid grid-cols-2'>
                                    <p>Specical</p>
                                    <p>Value</p>
                                </div>
                                {specData.map((item, index) => {
                                    return (
                                        <div className='grid grid-cols-2' key={index}>
                                            <input
                                                className='text-left font-semibold text-sm'
                                                value={item.spec}
                                                onChange={(e) => handleSpecChange(index, 'spec', e.target.value)}
                                            />
                                            <input
                                                className='text-left text-sm font-light'
                                                value={item.value}
                                                onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='flex flex-wrap space-x-2'>
                            {data?.imgs.map((img) => (
                                <Image key={img} src={img} alt='' width={75} height={75}></Image>
                            ))}
                        </div>
                        <div>
                            <label htmlFor="uploadFile1"
                                   className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-36 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500"
                                     viewBox="0 0 32 32">
                                    <path
                                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                        data-original="#000000"/>
                                    <path
                                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                        data-original="#000000"/>
                                </svg>
                                Upload file
                                <input type="file" id='uploadFile1' className="hidden"/>
                                <p className="text-xs font-medium text-gray-400 mt-2">PNG, JPG, SVG and WEBP
                                    are Allowed.</p>
                            </label>
                        </div>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Save Changes
                        </button>
                    </form>
                </>
            </ActionMethod>
        </div>
    );
}
