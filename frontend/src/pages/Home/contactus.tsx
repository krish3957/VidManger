const ContactUsSection = () => {
    return (
        <section className="bg-gray-900 text-white py-20">
            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
                <div className="flex flex-col md:flex-row justify-around">
                    <div className="max-w-md">
                        <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                        <p className="mb-4">Have questions or feedback? Reach out to us and we'll get back to you as soon as possible.</p>
                        <p className="mb-4">Email: info@vidmanager.com</p>
                        <p className="mb-4">Phone: +1 (123) 456-7890</p>
                    </div>
                    <form className="w-[30vw] bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
                        <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-lg font-medium">Your Name</label>
                            <input type="text" id="name" name="name" className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-medium">Your Email</label>
                            <input type="email" id="email" name="email" className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-lg font-medium">Message</label>
                            <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-black"></textarea>
                        </div>
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContactUsSection;
