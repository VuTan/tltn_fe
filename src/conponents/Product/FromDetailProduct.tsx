import React, {useEffect, useState} from 'react';
import Image from "next/image";

export default function ProductForm({data}) {
    const [formData, setFormData] = useState({
        name: '',
        des: [''],
        stock: '',
        base_price: '',
        category: '',
        spec: [{spec: 'Brand', value: 'HP'}],
        imgs: [],
    });

    const [errors, setErrors] = useState({});

    const adjustTextAreaHeight = () => {
        const textareas = document.querySelectorAll('textarea[data-auto-resize]');
        textareas.forEach((textarea) => {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        });
    };

    useEffect(() => {
        if (data) {
            setFormData({
                name: data.name || '',
                des: data.des && data.des.length
                    ? data.des
                    : [''],
                stock: data.stock ? String(data.stock) : '',
                base_price: data.price ? String(data.price) : '',
                category: data.category || '',
                spec: data.spec && data.spec.length
                    ? data.spec
                    : [{spec: 'Brand', value: 'HP'}],
                imgs: data.imgs && data.imgs.length
                    ? data.imgs
                    : ['']
            });

            // Đợi DOM cập nhật và điều chỉnh chiều cao textarea
            setTimeout(adjustTextAreaHeight, 0);
        }
    }, [data]);


    const handleDescriptionChange = (index, value, textarea) => {
        const newDescription = [...formData.des];
        newDescription[index] = value;

        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }

        setFormData(prev => ({
            ...prev,
            des: newDescription
        }));
    };

    const addDescriptionLine = () => {
        setFormData(prev => ({
            ...prev,
            des: [...prev.des, '']
        }));
    };

    const removeDescriptionLine = (index) => {
        const newDescription = formData.des.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            des: newDescription.length ? newDescription : ['']
        }));
    };

    const handleChange = (e, field) => {
        const {value} = e.target;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSpecChange = (index, field, value) => {
        const newSpecs = [...formData.spec];
        newSpecs[index][field] = value;
        setFormData(prev => ({
            ...prev,
            spec: newSpecs
        }));
    };

    const addSpecification = () => {
        setFormData(prev => ({
            ...prev,
            spec: [...prev.spec, {spec: '', value: ''}]
        }));
    };

    const removeSpecification = (index) => {
        const newSpecs = formData.spec.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            spec: newSpecs
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Product name is required';
        if (formData.des.some(item => item.trim() === '')) {
            newErrors.des = 'At least one description line is required';
        }
        if (!formData.stock) newErrors.stock = 'Stock quantity is required';
        if (!formData.base_price) newErrors.price = 'Price is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (formData.spec.some(item => item.spec.trim() === '' || item.value.trim() === '')) {
            newErrors.spec = 'At least one specification line is required';
        }
        if (formData.imgs.length === 0) {
            newErrors.imgs = 'At least one image is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = (prev) => {
                setFormData(prev => ({
                    ...prev,
                    imgs: [...prev.imgs, reader.result]
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpLoadMainImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imgs: [reader.result, ...prev.imgs.slice(1)]
                }));
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className='text-center w-[770px]'>
            <div className="flex items-center">
                <h3 className="text-blue-600 text-xl font-bold flex-1">Product</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                <div className='flex space-x-6'>
                    <div>
                        {formData.imgs[0] ?
                            (<Image
                                src={formData.imgs[0]}
                                alt={formData?.name}
                                width={150}
                                height={150}
                                style={{
                                    width: "150px",
                                    height: "150px",
                                }}
                            />)
                            :
                            (<div>
                                <label
                                    htmlFor="uploadFile1"
                                    className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-36 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500"
                                         viewBox="0 0 32 32">
                                        <path
                                            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"/>
                                        <path
                                            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"/>
                                    </svg>
                                    Upload file
                                    <input
                                        type="file"
                                        id='uploadFile1'
                                        className="hidden"
                                        accept=".png,.jpg,.svg,.webp"
                                        onChange={handleUpLoadMainImg}
                                    />
                                    <p className="text-xs font-medium text-gray-400 mt-2">
                                        PNG, JPG, SVG and WEBP are Allowed.
                                    </p>
                                </label>
                            </div>)
                        }
                        {errors.imgs && <p className="text-red-500 text-xs">{errors.imgs}</p>}
                    </div>
                    <div className='w-full'>
                        <label className="text-left font-bold text-gray-800 text-sm mb-2 block">
                            Name of the product
                        </label>
                        <textarea
                            placeholder="Write about the product"
                            className={`px-4 w-full py-3 bg-gray-100 text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg ${errors.name ? 'border-red-500' : ''}`}
                            rows="5"
                            value={formData.name}
                            onChange={(e) => handleChange(e, 'name')}
                        />
                        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                    </div>
                </div>

                <div>
                    <label className="text-left font-bold text-gray-800 text-sm mb-2 block">
                        Descriptions
                    </label>
                    {formData.des.map((desc, index) => (
                        <div key={index} className="flex items-center mb-2">

                            <textarea
                                placeholder="Write description line"
                                className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg ${errors.des ? 'border-red-500' : ''}`}
                                rows="1"
                                value={desc}
                                onChange={(e) => handleDescriptionChange(index, e.target.value, e.target)}
                                style={{resize: 'none', overflow: 'hidden'}}
                                data-auto-resize
                            />
                            <button
                                type="button"
                                onClick={() => removeDescriptionLine(index)}
                                className="ml-2 text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    {errors.des && <p className="text-red-500 text-xs">{errors.des}</p>}

                    <button
                        type="button"
                        onClick={addDescriptionLine}
                        className="text-blue-600 font-semibold mt-2"
                    >
                        Add Description Line
                    </button>
                </div>

                {/* Rest of the form remains the same */}
                <div>
                    <label className="text-left font-bold text-gray-800 text-sm mb-2 block">
                        Stock
                    </label>
                    <input
                        type="number"
                        placeholder="Enter quantity"
                        className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg ${errors.stock ? 'border-red-500' : ''}`}
                        value={formData.stock}
                        onChange={(e) => handleChange(e, 'stock')}
                    />
                    {errors.stock && <p className="text-red-500 text-xs">{errors.stock}</p>}
                </div>

                {/* Remaining form fields... */}
                <div>
                    <label className="text-left font-bold text-gray-800 text-sm mb-2 block">
                        Selling price
                    </label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg ${errors.price ? 'border-red-500' : ''}`}
                        value={formData.base_price}
                        onChange={(e) => handleChange(e, 'base_price')}
                    />
                    {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
                </div>

                <div>
                    <label className="text-left font-bold text-gray-800 text-sm mb-2 block">
                        Category
                    </label>
                    <input
                        type="text"
                        placeholder="Enter product category"
                        className={`px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg ${errors.category ? 'border-red-500' : ''}`}
                        value={formData.category}
                        onChange={(e) => handleChange(e, 'category')}
                    />
                    {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
                </div>

                {/* Specifications section */}
                <div>
                    <div className='space-y-2'>
                        <div className='font-bold text-left grid grid-cols-2'>
                            <p>Special</p>
                            <p>Value</p>
                        </div>
                        {formData.spec.map((item, index) => (
                            <div key={index} className='grid grid-cols-2 gap-2 items-center'>
                                <input
                                    className='text-left font-semibold text-sm px-2 py-1 bg-gray-100 rounded'
                                    placeholder="Specification"
                                    value={item.spec}
                                    onChange={(e) => handleSpecChange(index, 'spec', e.target.value)}
                                />
                                <div className='flex items-center'>
                                    <input
                                        className='text-left text-sm font-light flex-1 px-2 py-1 bg-gray-100 rounded'
                                        placeholder="Value"
                                        readOnly={index === 0 ? true : false}
                                        value={item.value}
                                        onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSpecification(index)}
                                            className="ml-2 text-red-500"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        {errors.spec && <p className="text-red-500 text-xs">{errors.spec}</p>}
                        <button
                            type="button"
                            onClick={addSpecification}
                            className="text-blue-600 font-semibold mt-2"
                        >
                            Add Specification
                        </button>
                    </div>
                </div>

                {/* Image section */}
                <div className='w-full flex flex-wrap gap-2 mb-4'>
                    {formData?.imgs.map((img, index) => (
                        <div className='border'>
                            <Image
                                key={index}
                                src={img}
                                alt={`Product image ${index + 1}`}
                                width={115}
                                height={115}
                                style={{
                                    width: "115px",
                                    height: "115px",
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* File upload section */}
                <div>
                    <label
                        htmlFor="uploadFile1"
                        className="bg-white text-gray-500 font-semibold text-base rounded max-w-md h-36 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-11 mb-2 fill-gray-500" viewBox="0 0 32 32">
                            <path
                                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"/>
                            <path
                                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"/>
                        </svg>
                        Upload file
                        <input
                            type="file"
                            id='uploadFile1'
                            className="hidden"
                            accept=".png,.jpg,.svg,.webp"
                            onChange={handleFileUpload}
                        />
                        <p className="text-xs font-medium text-gray-400 mt-2">
                            PNG, JPG, SVG and WEBP are Allowed.
                        </p>
                    </label>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}