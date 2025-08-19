import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { changePassword } from '@/services/user/user.service';
import { useAlertStore } from '@/store/alert.store';
import { Loader2 } from 'lucide-react';
import React from 'react';

function AddPasswordForm() {
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await changePassword(password);
            useAlertStore.getState().showAlert(
                "success",
                "Success!",
                "Your password has been updated."
            );
        } catch (err: any) {
            useAlertStore.getState().showAlert(
                "error",
                "Failed!",
                err?.response?.data?.message || "Failed to update password"
              );
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-between md:flex-row flex-col items-start md:items-center">
            <form className="flex w-full items-end gap-2 my-6" onSubmit={handleSubmit}>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="email">Add password</Label>
                    <Input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                {isLoading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <Button variant="outline" className='mt-3' type='submit'>Change password</Button>
                )}
            </form>
        </div>
    );
}

export default AddPasswordForm;