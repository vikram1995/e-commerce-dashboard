export default function RegisterLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <div className="">
            {children}
        </div>
    )
}