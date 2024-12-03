import {MagnifyingGlassCircleIcon} from "@heroicons/react/24/outline";

function SearchBar() {
    return (
        <div className="relative min-w-72">
            <input
                type="text"
                placeholder="What are you looking for..."
                className="block w-full px-4 py-2 pl-4 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-2 flex items-center ">
                <MagnifyingGlassCircleIcon className="size-8 text-gray-500"/>
            </div>
        </div>
    );
}

export default SearchBar;