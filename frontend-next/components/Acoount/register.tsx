"use client";
import { useState } from "react";
import styles from "@/src/scss/register.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { registerUser } from "@/src/api/account";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  type Errors = {
    username?: string[];
    email?: string[];
    password?: string[];
    confirm_password?: string[];
  };
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username: form.username,
      email: form.email,
      password: form.password,
      confirm_password: form.confirm_password,
    };

    try {
      const res = await registerUser(userData);

      console.log("REGISTER SUCCESS:", res);

      setErrors({});
      setSuccess(true);

      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("FULL ERROR:", error.response?.data);

        setErrors(error.response?.data || {});
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1 className={styles.title}>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={styles.input}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            value={form.username}
          />
          <small>{errors.username?.[0]}</small>

          <input
            type="email"
            name="email"
            placeholder="Email..."
            className={styles.input}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
          />
          <small>{errors.email?.[0]}</small>

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
          />
          <small>{errors.password?.[0]}</small>

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            className={styles.input}
            onChange={(e) =>
              setForm({
                ...form,
                confirm_password: e.target.value,
              })
            }
            value={form.confirm_password}
          />

          <small>{errors.confirm_password?.[0]}</small>

          {success && <small>Registration Successful</small>}
          {loading ? (
            <button type="submit" className={styles.button} disabled>
              Please Wait...
            </button>
          ) : (
            <button type="submit" className={styles.button}>
              Register
            </button>
          )}
        </form>

        <p className={styles.text}>Already have an account? Login</p>
      </div>
    </div>
  );
}
