
const PREDEFINED_STEPS = [
    { title: 'Packaging', color: 'yellow-500' },
    { title: 'Quality Check', color: 'orange-500' },
    { title: 'Delivering', color: 'blue-500' },
    { title: 'Delivered', color: 'green-500' },
    { title: 'Return Process', color: 'red-500' },
    { title: 'Refund Initiated', color: 'gray-500' },
];

export default function OrderStatus({status}) {
    const step = PREDEFINED_STEPS.find((step) => step.title === status);
    if (!step) return null;
    return (
        <>
            <div className={`py-1 px-2 w-fit rounded-2xl border-2 border-${step.color}`}>
                <p className={`text-${step.color} text-sm`}>{status}</p>
            </div>
        </>
    );
}
