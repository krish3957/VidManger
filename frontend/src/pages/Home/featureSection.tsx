const KnowMoreSection = () => {
    return (
        <section id="knowmore" className="relative bg-gray-900 text-white py-20">
            <div className="absolute inset-0 background-image opacity-20"></div>
            <div className="relative container mx-auto px-6 lg:px-20">
                <h2 className="text-4xl font-bold mb-8 text-center">Know More About VidManager</h2>
                <div className="flex flex-wrap justify-around">
                    <div className="max-w-md p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg m-4">
                        <h3 className="text-2xl font-semibold mb-4">For Creators</h3>
                        <ul className="space-y-2">
                            <li>
                                <h4 className="text-xl font-bold">Empower Your Creative Process</h4>
                                <p>Easily upload and manage your video drafts in one place.</p>
                            </li>
                            <li>
                                <h4 className="text-xl font-bold">Approval Workflow</h4>
                                <p>Approve videos with a simple click and ensure quality content.</p>
                            </li>
                            <li>
                                <h4 className="text-xl font-bold">Collaboration Tools</h4>
                                <p>Collaborate with your team seamlessly with our built-in feedback tools.</p>
                            </li>
                        </ul>
                    </div>
                    <div className="max-w-md p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg m-4">
                        <h3 className="text-2xl font-semibold mb-4">For Managers</h3>
                        <ul className="space-y-2">
                            <li>
                                <h4 className="text-xl font-bold">Streamline Your Management Tasks</h4>
                                <p>Efficiently review and suggest edits to video drafts.</p>
                            </li>
                            <li>
                                <h4 className="text-xl font-bold">Content Scheduling</h4>
                                <p>Schedule approved content to be published automatically.</p>
                            </li>
                            <li>
                                <h4 className="text-xl font-bold">Analytics & Reporting</h4>
                                <p>Track performance and generate detailed reports.</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-12">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">Learn More</button>
                </div>
            </div>
        </section>
    );
}

export default KnowMoreSection;
