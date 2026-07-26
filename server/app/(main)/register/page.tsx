'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Mail, Lock, Eye, EyeOff, Gem, User, X, AlertCircle, Loader, PartyPopper } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  AuthStyles,
  MotionProvider,
  m,
  AnimatePresence,
  GradientBackground,
  GlassButton,
  BlurFade,
  TextLoop,
  ConfettiCanvas,
  type ConfettiRef,
  GoogleIcon,
  GitHubIcon,
} from '@/components/ui/auth-shared'

const modalSteps = [
  { message: "Creating your account...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
  { message: "Setting up profile...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
  { message: "Almost there...", icon: <Loader className="w-12 h-12 text-primary animate-spin" /> },
  { message: "Welcome Aboard!", icon: <PartyPopper className="w-12 h-12 text-green-600" /> },
];
const TEXT_LOOP_INTERVAL = 1.5;

const DefaultLogo = () => (
  <div className="bg-[#005334] text-white rounded-md p-1.5">
    <Gem className="h-4 w-4" />
  </div>
);

type Step = 'email' | 'password' | 'confirmPassword' | 'name'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [authStep, setAuthStep] = useState<Step>('email')
  const [modalStatus, setModalStatus] = useState<'closed' | 'loading' | 'error' | 'success'>('closed')
  const [modalErrorMessage, setModalErrorMessage] = useState('')
  const confettiRef = useRef<ConfettiRef>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const isEmailValid = /\S+@\S+\.\S+/.test(email)
  const isPasswordValid = password.length >= 6
  const isConfirmPasswordValid = confirmPassword.length >= 6

  const fireSideCanons = () => {
    const fire = confettiRef.current?.fire
    if (fire) {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
      fire({ ...defaults, particleCount: 50, origin: { x: 0, y: 1 }, angle: 60 });
      fire({ ...defaults, particleCount: 50, origin: { x: 1, y: 1 }, angle: 120 });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (modalStatus !== 'closed' || authStep !== 'name') return

    if (password !== confirmPassword) {
      setModalErrorMessage("Passwords do not match!")
      setModalStatus('error')
      return
    }

    setModalStatus('loading')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name: name || undefined }),
      })
      const data = await res.json()

      if (!res.ok) {
        setModalErrorMessage(data.error || 'Registration failed. Please try again.')
        setModalStatus('error')
        return
      }

      const loadingStepsCount = modalSteps.length - 1
      const totalDuration = loadingStepsCount * TEXT_LOOP_INTERVAL * 1000
      setTimeout(() => {
        fireSideCanons()
        setModalStatus('success')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }, totalDuration)
    } catch {
      setModalErrorMessage('Something went wrong. Please try again.')
      setModalStatus('error')
    }
  }

  const handleProgressStep = () => {
    if (authStep === 'email' && isEmailValid) setAuthStep('password')
    else if (authStep === 'password' && isPasswordValid) setAuthStep('confirmPassword')
    else if (authStep === 'confirmPassword' && isConfirmPasswordValid) setAuthStep('name')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (authStep === 'name') handleFinalSubmit(e)
      else handleProgressStep()
    }
  }

  const handleGoBack = () => {
    if (authStep === 'name') { setAuthStep('confirmPassword'); setName('') }
    else if (authStep === 'confirmPassword') { setAuthStep('password'); setConfirmPassword('') }
    else if (authStep === 'password') { setAuthStep('email'); setPassword('') }
  }

  const closeModal = () => {
    setModalStatus('closed')
    setModalErrorMessage('')
  }

  useEffect(() => {
    if (authStep === 'password') setTimeout(() => passwordInputRef.current?.focus(), 500)
    else if (authStep === 'confirmPassword') setTimeout(() => confirmPasswordInputRef.current?.focus(), 500)
    else if (authStep === 'name') setTimeout(() => nameInputRef.current?.focus(), 500)
  }, [authStep])

  useEffect(() => {
    if (modalStatus === 'success') fireSideCanons()
  }, [modalStatus])

  const Modal = () => (
    <AnimatePresence>
      {modalStatus !== 'closed' && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <m.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white/80 backdrop-blur-md border-2 border-white/40 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4 mx-2 shadow-2xl">
            {(modalStatus === 'error' || modalStatus === 'success') && (
              <button onClick={closeModal} className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
            {modalStatus === 'error' && (
              <>
                <AlertCircle className="w-12 h-12 text-red-500" />
                <p className="text-lg font-medium text-gray-800">{modalErrorMessage}</p>
                <GlassButton onClick={closeModal} size="sm" className="mt-4">Try Again</GlassButton>
              </>
            )}
            {modalStatus === 'loading' && (
              <TextLoop interval={TEXT_LOOP_INTERVAL} stopOnEnd={true}>
                {modalSteps.slice(0, -1).map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                    {step.icon}
                    <p className="text-lg font-medium text-gray-800">{step.message}</p>
                  </div>
                ))}
              </TextLoop>
            )}
            {modalStatus === 'success' && (
              <div className="flex flex-col items-center gap-4">
                {modalSteps[modalSteps.length - 1].icon}
                <p className="text-lg font-medium text-gray-800">{modalSteps[modalSteps.length - 1].message}</p>
              </div>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )

  const stepTitles: Record<Step, { title: string; subtitle: string }> = {
    email: { title: "Get started with Us", subtitle: "Create your GemSelect account" },
    password: { title: "Create Password", subtitle: "At least 6 characters long" },
    confirmPassword: { title: "One Last Step", subtitle: "Confirm your password" },
    name: { title: "Your Name", subtitle: "How should we call you?" },
  }

  return (
    <MotionProvider>
    <div className="bg-background min-h-screen w-screen flex flex-col">
      <AuthStyles />
      <ConfettiCanvas ref={confettiRef} manualstart className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]" />
      <Modal />

      <div className="fixed top-4 left-4 z-20 flex items-center gap-2 md:left-1/2 md:-translate-x-1/2">
        <DefaultLogo />
        <h1 className="text-base font-bold text-foreground">GemSelect</h1>
      </div>

      <div className="flex w-full flex-1 h-full items-center justify-center bg-card relative overflow-hidden">
        <div className="absolute inset-0 z-0"><GradientBackground /></div>
        <fieldset disabled={modalStatus !== 'closed'} className="relative z-10 flex flex-col items-center gap-8 w-[280px] mx-auto p-4">
          <AnimatePresence mode="wait">
            {authStep === 'email' && (
              <m.div key="email-content" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center gap-4">
                <BlurFade delay={0.25 * 1} className="w-full">
                  <div className="text-center">
                    <p className="font-serif font-light text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground whitespace-nowrap">{stepTitles[authStep].title}</p>
                  </div>
                </BlurFade>
                <BlurFade delay={0.25 * 2}><p className="text-sm font-medium text-muted-foreground">Continue with</p></BlurFade>
                <BlurFade delay={0.25 * 3}><div className="flex items-center justify-center gap-4 w-full">
                  <GlassButton contentClassName="flex items-center justify-center gap-2" size="sm"><GoogleIcon /><span className="font-semibold text-foreground">Google</span></GlassButton>
                  <GlassButton contentClassName="flex items-center justify-center gap-2" size="sm"><GitHubIcon /><span className="font-semibold text-foreground">GitHub</span></GlassButton>
                </div></BlurFade>
                <BlurFade delay={0.25 * 4} className="w-[300px]"><div className="flex items-center w-full gap-2 py-2"><hr className="w-full border-border"/><span className="text-xs font-semibold text-muted-foreground">OR</span><hr className="w-full border-border"/></div></BlurFade>
              </m.div>
            )}
            {(authStep === 'password' || authStep === 'confirmPassword' || authStep === 'name') && (
              <m.div key={authStep + '-title'} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center text-center gap-4">
                <BlurFade delay={0} className="w-full">
                  <div className="text-center">
                    <p className="font-serif font-light text-4xl sm:text-5xl tracking-tight text-foreground whitespace-nowrap">{stepTitles[authStep].title}</p>
                  </div>
                </BlurFade>
                <BlurFade delay={0.25 * 1}><p className="text-sm font-medium text-muted-foreground">{stepTitles[authStep].subtitle}</p></BlurFade>
              </m.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleFinalSubmit} className="w-[300px] space-y-6">
            <AnimatePresence>
              {authStep === 'email' && (
                <m.div key="email-field" exit={{ opacity: 0, filter: 'blur(4px)' }} transition={{ duration: 0.3 }} className="w-full">
                  <BlurFade delay={0.25 * 5} inView={true} className="w-full">
                    <div className="relative w-full">
                      <div className="glass-input-wrap w-full"><div className="glass-input">
                        <span className="glass-input-text-area"></span>
                        <div className={cn("relative z-10 flex-shrink-0 flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out", email.length > 20 ? "w-0 px-0" : "w-10 pl-2")}><Mail className="h-5 w-5 text-foreground/80 flex-shrink-0" /></div>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleKeyDown} autoFocus className={cn("relative z-10 h-full w-0 flex-grow bg-transparent text-foreground placeholder:text-foreground/60 focus:outline-none transition-[padding-right] duration-300 ease-in-out delay-300", isEmailValid ? "pr-2" : "pr-0")} />
                        <div className={cn("relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isEmailValid ? "w-10 pr-1" : "w-0")}><GlassButton type="button" onClick={handleProgressStep} size="icon" aria-label="Continue with email" contentClassName="text-foreground/80 hover:text-foreground"><ArrowRight className="w-5 h-5" /></GlassButton></div>
                      </div></div>
                    </div>
                  </BlurFade>
                </m.div>
              )}
              {authStep === 'password' && (
                <m.div key="password-field" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(4px)' }} transition={{ duration: 0.3 }} className="w-full space-y-4">
                  <BlurFade className="w-full">
                    <div className="relative w-full">
                      <AnimatePresence>
                        {password.length > 0 && <m.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -top-6 left-4 z-10"><label className="text-xs text-muted-foreground font-semibold">Password</label></m.div>}
                      </AnimatePresence>
                      <div className="glass-input-wrap w-full"><div className="glass-input">
                        <span className="glass-input-text-area"></span>
                        <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 pl-2">
                          {isPasswordValid ? <button type="button" aria-label="Toggle password visibility" onClick={() => setShowPassword(!showPassword)} className="text-foreground/80 hover:text-foreground transition-colors p-2 rounded-full">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button> : <Lock className="h-5 w-5 text-foreground/80 flex-shrink-0" />}
                        </div>
                        <input ref={passwordInputRef} type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown} className="relative z-10 h-full w-0 flex-grow bg-transparent text-foreground placeholder:text-foreground/60 focus:outline-none" />
                        <div className={cn("relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isPasswordValid ? "w-10 pr-1" : "w-0")}><GlassButton type="button" onClick={handleProgressStep} size="icon" aria-label="Continue" contentClassName="text-foreground/80 hover:text-foreground"><ArrowRight className="w-5 h-5" /></GlassButton></div>
                      </div></div>
                    </div>
                    <BlurFade inView delay={0.2}><button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"><ArrowLeft className="w-4 h-4" /> Go back</button></BlurFade>
                  </BlurFade>
                </m.div>
              )}
              {authStep === 'confirmPassword' && (
                <m.div key="confirm-field" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(4px)' }} transition={{ duration: 0.3 }} className="w-full space-y-4">
                  <BlurFade className="w-full">
                    <div className="relative w-full">
                      <AnimatePresence>
                        {confirmPassword.length > 0 && <m.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -top-6 left-4 z-10"><label className="text-xs text-muted-foreground font-semibold">Confirm Password</label></m.div>}
                      </AnimatePresence>
                      <div className="glass-input-wrap w-full"><div className="glass-input">
                        <span className="glass-input-text-area"></span>
                        <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 pl-2">
                          {isConfirmPasswordValid ? <button type="button" aria-label="Toggle confirm password visibility" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-foreground/80 hover:text-foreground transition-colors p-2 rounded-full">{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button> : <Lock className="h-5 w-5 text-foreground/80 flex-shrink-0" />}
                        </div>
                        <input ref={confirmPasswordInputRef} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={handleKeyDown} className="relative z-10 h-full w-0 flex-grow bg-transparent text-foreground placeholder:text-foreground/60 focus:outline-none" />
                        <div className={cn("relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out", isConfirmPasswordValid ? "w-10 pr-1" : "w-0")}><GlassButton type="button" onClick={handleProgressStep} size="icon" aria-label="Continue" contentClassName="text-foreground/80 hover:text-foreground"><ArrowRight className="w-5 h-5" /></GlassButton></div>
                      </div></div>
                    </div>
                    <BlurFade inView delay={0.2}><button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"><ArrowLeft className="w-4 h-4" /> Go back</button></BlurFade>
                  </BlurFade>
                </m.div>
              )}
              {authStep === 'name' && (
                <m.div key="name-field" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full space-y-4">
                  <BlurFade className="w-full">
                    <div className="relative w-full">
                      <AnimatePresence>
                        {name.length > 0 && <m.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }} className="absolute -top-6 left-4 z-10"><label className="text-xs text-muted-foreground font-semibold">Full Name</label></m.div>}
                      </AnimatePresence>
                      <div className="glass-input-wrap w-full"><div className="glass-input">
                        <span className="glass-input-text-area"></span>
                        <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 pl-2">
                          <User className="h-5 w-5 text-foreground/80 flex-shrink-0" />
                        </div>
                        <input ref={nameInputRef} type="text" placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleFinalSubmit(e) } }} className="relative z-10 h-full w-0 flex-grow bg-transparent text-foreground placeholder:text-foreground/60 focus:outline-none" />
                        <div className="relative z-10 flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out w-10 pr-1"><GlassButton type="submit" size="icon" aria-label="Finish sign-up" contentClassName="text-foreground/80 hover:text-foreground"><ArrowRight className="w-5 h-5" /></GlassButton></div>
                      </div></div>
                    </div>
                    <BlurFade inView delay={0.2}><button type="button" onClick={handleGoBack} className="mt-4 flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"><ArrowLeft className="w-4 h-4" /> Go back</button></BlurFade>
                  </BlurFade>
                </m.div>
              )}
            </AnimatePresence>
          </form>

          <BlurFade delay={0.5}>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-[#005334] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </BlurFade>
        </fieldset>
      </div>
    </div>
    </MotionProvider>
  )
}
