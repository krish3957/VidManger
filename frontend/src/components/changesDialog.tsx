import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog'
import { Button } from './ui/button'
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import axios from 'axios';

interface changeDialogProps {
    id: string;
}

export const ChangeDialog = ({
    id
}: changeDialogProps) => {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const submitReview = async () => {
        if (!title || !description) {
            return;
        }
        await axios.put(`http://localhost:5000/api/draft/${id}/review`, {
            review: {
                title,
                description
            }
        })
            .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' className='mr-2'>
                    Suggest Changes
                </Button>
            </DialogTrigger>
            <DialogContent className='max-w-[675px]'>
                <DialogHeader className='text-2xl'>
                    Suggest Changes
                    <DialogDescription className='text-lg'>
                        Suggest your manager some changes to the draft. Click save when you are done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-6 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Title
                        </Label>
                        <Input id="title"
                            placeholder='Enter title here...'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-5" />
                    </div>
                    <div className="grid grid-cols-6 items-center gap-4">
                        <Label htmlFor="content" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="username"
                            placeholder='Describe the changes here...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-5" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={() => {
                        submitReview();
                    }} >Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
