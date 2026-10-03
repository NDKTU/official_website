import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Eye,
  EyeOff,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  BookOpen,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { LoginApi } from "../Api/LoginApi";
import HemisLogo from "../components/HemisLogo";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useMutation({
    mutationFn: LoginApi,
    onSuccess: () => {
      toast.success("Tizimga muvaffaqiyatli kirdingiz");
      navigate(location.state?.from?.pathname || "/", { replace: true });
    },
    onError: () => {
      toast.error(
        "Tizimga kirib bo‘lmadi. Login va parolni tekshirib, qayta urinib ko‘ring.",
      );
    },
  });
  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string().required("Loginni kiriting"),
      password: Yup.string().required("Parolni kiriting"),
    }),
    onSubmit: (values) => mutation.mutate(values),
  });
  return (
    <div className="login-layout">
      <section className="login-visual">
        <HemisLogo />
        <div className="login-message">
          <span className="eyebrow">UNIVERSITET BOSHQARUV TIZIMI</span>
          <h1>
            Ta’lim va axborot.
            <br />
            <span>Yagona makonda.</span>
          </h1>
          <p>
            Universitet sayti, fakultetlar va yangiliklarni bir joydan qulay
            boshqaring.
          </p>
          <div className="login-illustration" aria-hidden="true">
            <div className="illustration-circle">
              <GraduationCap size={112} strokeWidth={1.25} />
            </div>
            <span className="floating-icon floating-one">
              <BookOpen size={30} />
            </span>
            <span className="floating-icon floating-two">
              <Users size={30} />
            </span>
            <span className="illustration-spark">✦</span>
          </div>
        </div>
        <p className="login-caption">NSUMT · Universitet boshqaruv paneli</p>
      </section>
      <section className="login-form-side">
        <div className="login-form-wrap">
          <div className="login-mobile-brand">
            <HemisLogo />
          </div>
          <span className="login-shield">
            <ShieldCheck size={26} />
          </span>
          <h2>Xush kelibsiz!</h2>
          <p>Boshqaruv paneliga kirish uchun ma’lumotlaringizni kiriting.</p>
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="login-field">
              <label htmlFor="username">Login</label>
              <input
                id="username"
                autoComplete="username"
                placeholder="Loginni kiriting"
                {...formik.getFieldProps("username")}
                aria-invalid={Boolean(
                  formik.touched.username && formik.errors.username,
                )}
                aria-describedby={
                  formik.touched.username && formik.errors.username
                    ? "username-error"
                    : undefined
                }
              />
              {formik.touched.username && formik.errors.username && (
                <small id="username-error" className="field-error">
                  {formik.errors.username}
                </small>
              )}
            </div>
            <div className="login-field">
              <label htmlFor="password">Parol</label>
              <div className="password-input">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Parolni kiriting"
                  {...formik.getFieldProps("password")}
                  aria-invalid={Boolean(
                    formik.touched.password && formik.errors.password,
                  )}
                  aria-describedby={
                    formik.touched.password && formik.errors.password
                      ? "password-error"
                      : undefined
                  }
                />
                <button
                  type="button"
                  aria-label={
                    showPassword ? "Parolni yashirish" : "Parolni ko‘rsatish"
                  }
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((value) => !value)}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <small id="password-error" className="field-error">
                  {formik.errors.password}
                </small>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary login-submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Kirilmoqda…" : "Tizimga kirish"}
              <ArrowRight size={18} />
            </button>
          </form>
          <p className="login-help">
            <ShieldCheck size={16} />
            Faqat vakolatli foydalanuvchilar uchun
          </p>
        </div>
        <footer>
          © {new Date().getFullYear()} NSUMT. Barcha huquqlar himoyalangan.
        </footer>
      </section>
    </div>
  );
}
