import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { updateAvatar } from '@/services/user/user.service';
import { useAlertStore } from '@/store/alert.store';
import { Loader2, Upload } from 'lucide-react';
import React, { useState } from 'react';

function AvatarForm() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        setIsLoading(true);
        if (!selectedFile){
            useAlertStore.getState().showAlert(
                "error",
                "Error!",
                "Please select a file first."
            );
            return;
        }
        try {
            await updateAvatar(selectedFile);
            // тут можна викликати getMe() щоб оновити аватар у сторі
            useAlertStore.getState().showAlert(
                "success",
                "Success!",
                "Your avatar has been updated."
            );
        } catch (err) {
            useAlertStore.getState().showAlert(
                "error",
                "Error!",
                "Failed to update avatar. Please try again."
            );
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex gap-2">
            <Input type="file" className='lg:w-auto w-3xs' accept="image/png" onChange={handleFileChange} />
            <Button className="w-full lg:w-auto" variant="outline" onClick={handleUpload} disabled={!selectedFile || isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : <Upload />}
                Upload
            </Button>
        </div>
    );
}

export default AvatarForm;