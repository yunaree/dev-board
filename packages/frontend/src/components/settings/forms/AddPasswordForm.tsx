import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validatePasswordStrength } from '@/helpers/passwordStrength';
import { changePassword } from '@/services/user/user.service';
import { useAlertStore } from '@/store/alert.store';
import { Eye, EyeOff, Loader2, LucideEyeOff } from 'lucide-react';
import React from 'react';

function AddPasswordForm() {
    const [password, setPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationError = validatePasswordStrength(password);
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
                <div className="grid w-full max-w-sm items-center gap-3 relative">
                    <Label htmlFor="password">Add password</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pr-10" 
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" strokeWidth={1} style={{ color: "var(--color-sidebar-ring)" }} />
                            ) : (
                                <Eye className="h-4 w-4" strokeWidth={1} style={{ color: "var(--color-sidebar-ring)" }} />
                            )}
                        </button>
                    </div>
                </div>
                
                    <Button variant="outline" className="mt-7" type="submit"  disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 className="animate-spin w-4 h-4" />
                        ) : (
                            "Change password"
                        )}
                    </Button>
                
            </form>
        </div>
    );
}

export default AddPasswordForm;