"use client";
import { useState } from "react";
import styles from "@/src/scss/register.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { registerUser } from "@/src/api/account";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import img from "@/public/accountbg.jpeg";
import Link from "next/link";
import { Loader2 } from "lucide-react";

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

      setTimeout(() => {
        router.push("/account/login");
      }, 1500);
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
        <div className={styles.register}>
          <div className={styles.overlay} />
          <AnimatePresence mode="wait">
            <motion.div
              className={styles.imagebg}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={img}
                alt="Hero"
                fill
                priority
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  // objectPosition: "center center",
                }}
              />
            </motion.div>
          </AnimatePresence>
          <div className={styles.content}>
            <form onSubmit={handleSubmit}>
              <h1 className={styles.title}>Create Your Profile</h1>
              <p className={styles.subtitle}>
                Create your account and discover the latest collections.
              </p>
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
              {errors.email && (
                <p className={styles.error}>{errors.email[0]}</p>
              )}

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
                  <Loader2 className={styles.spinner} />
                  Creating Account...
                </button>
              ) : (
                <button type="submit" className={styles.button}>
                  Register
                </button>
              )}
              <div>
                {/* <button type="button" className={styles.google}>
                  Continue with Google
                </button> */}
              </div>
            </form>
            <p className={styles.text}>
              Already have an account?
              <Link href="/account/login"> Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
