import React, { ElementRef, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { uploadFile } from "@/lib/uploadFile";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import draftSchema from "@/lib/validation/draft";
import { Edit } from "lucide-react";

interface EditDraftProps {
    draft: {
        _id: string;
        title: string;
        description: string;
        category?: string;
        keywords?: string;
        privacy: string;
        content: string;
        thumbnail: string;
        owner: string;
        manager: string;
    },
    data: {
        youtubeChannelId: string;
        name: string;
    }
}
const EditDraft = ({
    draft: { _id, title, description, category, keywords, privacy, content, thumbnail, owner, manager }, data
}: EditDraftProps) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [URL, setURL] = useState("");
    const [thumbnaileFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailURL, setThumbnailURL] = useState("");
    const [thumbnailProgress, setThumbnailProgress] = useState(0);
    const [progress, setProgress] = useState(0);
    const [formData, setFormData] = useState({
        title: title,
        description: description,
        category: category,
        keywords: keywords,
        privacy: privacy,
        content: content,
        thumbnail: thumbnail,
    });
    const [errors, setErrors] = useState({});

    const closeRef = useRef<ElementRef<"button">>(null);
    const apiKey = "AIzaSyBytyFO6SAL4mJPDPCLKWz7D7sSiTDBLaI";

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/youtube/v3/videoCategories`,
                    {
                        params: {
                            part: 'snippet',
                            regionCode: 'US',
                            key: apiKey,
                        },
                    }
                );

                const categories = response.data.items.map((category) => ({
                    value: category.id,
                    Label: category.snippet.title,
                }));

                setCategories(categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [apiKey]);

    useEffect(() => {
        if (!file) {
            return;
        }
        uploadFile(file, setURL, setProgress);
    }, [file]);

    useEffect(() => {
        if (!thumbnaileFile) {
            return;
        }
        uploadFile(thumbnaileFile, setThumbnailURL, setThumbnailProgress);
    }, [thumbnaileFile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    const handleThumbnailFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
        }
    }

    const validate = () => {
        const result = draftSchema.safeParse({
            title: formData.title,
            description: formData.description,
            category: formData.category,
            keywords: formData.keywords,
            privacy: formData.privacy,
            content: URL,
        });
        if (!result.success) {
            const fieldErrors = result.error.format();
            setErrors(fieldErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        setLoading(true);
        try {

            const response = await axios.put(
                `http://localhost:5000/api/draft/${_id}`,
                {
                    ...formData,
                    owner: owner,
                    manager: manager,
                    content: file ? URL : content,
                    thumbnail: thumbnaileFile ? thumbnailURL : thumbnail,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ).then(() => {
                closeRef?.current?.click();
                window.location.reload();

            });

            console.log(response.data);
        } catch (error) {
            console.error("Error adding draft:", error);
        }
        setLoading(false);
    };

    return (
        <ScrollArea>
            <Dialog>
                <DialogTrigger asChild>
                    <Button><Edit /></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            Edit draft details for
                            <Link className="ml-1 underline text-blue-600" to={`https://youtube.com/channel/${data.youtubeChannelId}`} target="_blank">
                                {data.name}
                            </Link>
                        </DialogTitle>
                        <DialogDescription className="text-lg">
                            Please be careful while editing draft details.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <Label className="block text-md font-medium text-black">Upload Video File</Label>
                            <Input
                                type="file"
                                accept="video/*"
                                className="mt-1 block w-full"
                                onChange={handleFileChange}
                            />
                            {progress > 0 && progress < 100 && (
                                <progress value={progress} max="100" className="mt-2 block w-full">{progress}%</progress>
                            )}
                            {progress === 100 && (
                                <p className="mt-2 text-green-600">File Uploaded Successfully</p>
                            )}
                            {errors.content && (
                                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-md font-medium text-black">Upload Video File</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="mt-1 block w-full"
                                onChange={handleThumbnailFileChange}
                            />
                            {thumbnailProgress > 0 && thumbnailProgress < 100 && (
                                <progress value={thumbnailProgress} max="100" className="mt-2 block w-full">{thumbnailProgress}%</progress>
                            )}
                            {progress === 100 && (
                                <p className="mt-2 text-green-600">File Uploaded Successfully</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-md font-medium text-black">Title</Label>
                            <Input
                                type="text"
                                name="title"
                                maxLength={100}
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            <span className="text-sm text-gray-500">{formData.title.length}/100</span>
                            {errors.title && (
                                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-md font-medium text-black">Description</Label>
                            <textarea
                                name="description"
                                maxLength={5000}
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            <span className="text-sm text-gray-500">{formData.description.length}/5000</span>
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-md font-medium text-black">Select Category</Label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            >
                                {categories.map((category) => (
                                    <option value={category.label} key={category.value}>
                                        {category.Label}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-md font-medium text-black">Tags</Label>
                            <Input
                                type="text"
                                name="keywords"
                                maxLength={500}
                                value={formData.keywords}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            <span className="text-sm text-gray-500">{formData.keywords.length}/500</span>
                            {errors.keywords && (
                                <p className="text-red-500 text-sm mt-1">{errors.keywords}</p>
                            )}
                        </div>
                        <div>
                            <Label className="block text-md font-medium text-black">Select Video Visibility</Label>
                            <select
                                name="privacy"
                                value={formData.privacy}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="unlisted">Unlisted</option>
                            </select>
                            {errors.privacy && (
                                <p className="text-red-500 text-sm mt-1">{errors.privacy}</p>
                            )}
                        </div>
                        <DialogFooter className="mt-10">
                            <DialogClose asChild>
                                <Button variant="outline"
                                    ref={closeRef}
                                    className="disabled:cursor-not-allowed"
                                    disabled={loading}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit" className="disabled:cursor-not-allowed" disabled={loading || (file && progress !== 100)}>Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </ScrollArea>
    );
};

export default EditDraft;
