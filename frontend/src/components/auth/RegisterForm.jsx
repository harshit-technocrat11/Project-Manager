import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function RegisterForm({ ...props }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // client-side validation: passwords must match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const res = await registerUser(name, email, password);

    if (res.success) {
      toast.success("Account created! ");
      navigate("/dashboard");

      // form reset
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirm(false);
    } else {
      toast.error(res.message);
      console.log(res.message);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="Name">Full Name</FieldLabel>
              <Input
                id="Name"
                type="text"
                onChange={handleNameChange}
                placeholder="John Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                onChange={handleEmailChange}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div className="flex items-center gap-2">
                <Input
                  onChange={handlePasswordChange}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="inline-flex items-center justify-center p-1 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <div className="flex items-center gap-2">
                <Input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                  required
                />

                <button
                  type="button"
                  aria-label={
                    showConfirm
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  className="inline-flex items-center justify-center p-1 text-gray-600 hover:text-gray-900"
                  onClick={() => setShowConfirm((s) => !s)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <FieldDescription>Please confirm your password.</FieldDescription>
              {confirmPassword && password !== confirmPassword && (
                <div className="mt-2 text-sm text-red-600">
                  Passwords do not match.
                </div>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" onClick={handleRegister}>
                  Create Account
                </Button>

                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
