import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validatePasswordStrength } from '@/helpers/passwordStrength';
import { changePassword, comparePasswords } from '@/services/user/user.service';
import { useAlertStore } from '@/store/alert.store';
import { Loader2 } from 'lucide-react';
import React from 'react';

function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    const checkPasswords = async() => {
        try{
            return await comparePasswords(oldPassword);
        }catch(err:any){
            useAlertStore.getState().showAlert(
                "error",
                "Ooops!",
                err?.response?.data?.message
            )
        }
        return false
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isOldPasswordCorrect = await checkPasswords();
        if(!isOldPasswordCorrect){
            useAlertStore.getState().showAlert(
                "error",
                "Failed!",
                "Passwords do not match"
            );
            return;
        }
        const validationError = validatePasswordStrength(newPassword);
        if (validationError) {
            useAlertStore.getState().showAlert(
                "error",
                "Failed!",
                validationError
            );
            return;
        }
        setIsLoading(true);
        try {
            await changePassword(newPassword);
            useAlertStore.getState().showAlert(
                "success",
                "Success!",
                "Your password has been updated."
            );
            setNewPassword('')
            setOldPassword('')
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

    return(
        <form className="flex justify-between md:flex-row flex-col items-start md:items-center" onSubmit={handleSubmit}>
            <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Old password</Label>
                <Input type="password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} />
            </div>
            <div className="flex w-full max-w-sm items-end gap-2 my-6">
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="email">New password</Label>
                    <Input disabled={!oldPassword} type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                </div>
                <Button variant="outline" className='mt-3' type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                        "Change password"
                    )} 
                </Button>
            </div>
        </form>
    );
}

export default ChangePasswordForm;