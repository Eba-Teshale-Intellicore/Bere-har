"use client";
import { useState } from "react";
import styles from "@/src/scss/login.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useAuth } from "@/app/AuthProvider";
import { loginUser, getProfile } from "@/src/api/account";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username: form.username,
      password: form.password,
    };

    try {
      const response = await loginUser(userData);
      const profile = await getProfile();
      login(profile);
      setError("");
      setSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      setError("Invalid username or password");
      setSuccess(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h1 className={styles.title}>Sign In</h1>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={styles.input}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            value={form.username}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.input}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
          />
          {error && <small>{error}</small>}
          {success && <small>Login Successfully</small>}
          {loading ? (
            <button type="submit" className={styles.button} disabled>
              Please Wait...
            </button>
          ) : (
            <button type="submit" className={styles.button}>
              Login
            </button>
          )}
        </form>

        <p className={styles.text}>Create Account? Signup</p>
      </div>
    </div>
  );
}
