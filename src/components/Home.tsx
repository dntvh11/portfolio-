import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  CTAButtonProps,
  HomeProps,
  SocialLinkProps,
  TechStackProps,
} from "~/types/types";

// Memoized Components
const StatusBadge: React.FC = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    {/* <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div> */}
  </div>
));

const MainTitle: React.FC = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          FullStack
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack: React.FC<TechStackProps> = memo(({ tech }) => (
  <div className="px-4 py-2 block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton: React.FC<CTAButtonProps> = memo(
  ({ href, text, icon: Icon }) => (
    <a href={href}>
      <button className="group relative w-[138px] sm:w-[160px]">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
        <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
          <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
          <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
            <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
              {text}
            </span>
            <Icon
              className={`w-4 h-4 text-gray-200 ${
                text === "Contact"
                  ? "group-hover:translate-x-1"
                  : "group-hover:rotate-45"
              } transform transition-all duration-300 z-10`}
            />
          </span>
        </div>
      </button>
    </a>
  )
);

const SocialLink: React.FC<SocialLinkProps> = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Frontend Developer", "Backend Developer"];
const TECH_STACK = ["Nodejs", "Python", "Reactjs", "Nextjs", "Nestjs"];
const SOCIAL_LINKS: SocialLinkProps[] = [
  { icon: Github, link: "https://github.com/dntvh11" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/ekizr/" },
  { icon: Instagram, link: "https://www.instagram.com/ekizr_/?hl=id" },
];

const Home: React.FC<HomeProps> = ({ innerRef }) => {
  const [text, setText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping, charIndex]);

  return (
    <div
      className="min-h-screen bg-[#030014] overflow-hidden relative"
      id="Home"
      ref={innerRef}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-[#6366f1]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#a855f7]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="flex flex-col lg:flex-row items-center min-h-screen justify-center gap-8 lg:gap-12 xl:gap-16 py-8 lg:py-0">
            {/* Left Column */}
            <div
              className="w-full lg:w-[55%] xl:w-1/2 space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1 px-4 lg:px-0"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              {/* Header Section */}
              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="h-8 flex items-center justify-center lg:justify-start"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <span className="text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-5 md:h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>
              </div>

              {/* Description Section */}
              <div
                className="space-y-4 md:space-y-6"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                {/* Main Description */}
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 shadow-2xl">
                  <p className="text-sm md:text-base lg:text-lg font-medium text-gray-200 mb-4 leading-relaxed">
                    Lập trình viên full-stack chuyên về JavaScript (Node.js, React.js, NestJS, Next.js) và thành thạo Python.
                  </p>
                  
                  <p className="text-xs md:text-sm text-gray-400 mb-4">
                    Tập trung phát triển các giải pháp công nghệ và ứng dụng thực tiễn:
                  </p>

                  {/* Services Grid */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2 text-xs md:text-sm">
                      <div className="flex items-start space-x-2 group hover:bg-white/5 rounded-lg p-2 transition-all">
                        <span className="text-[#6366f1] text-base">•</span>
                        <span className="text-gray-300">
                          <strong className="text-white">Tool tự động hóa:</strong> 
                          <span className="text-gray-400"> bot Telegram, Discord, crawler dữ liệu, tool trading</span>
                        </span>
                      </div>
                                      
                      <div className="flex items-start space-x-2 group hover:bg-white/5 rounded-lg p-2 transition-all">
                        <span className="text-[#6366f1] text-base">•</span>
                        <span className="text-gray-300">
                          <strong className="text-white">Web development:</strong> 
                          <span className="text-gray-400"> landing pages, web apps, data management systems</span>
                        </span>
                      </div>
                      

                      <div className="flex items-start space-x-2 group hover:bg-white/5 rounded-lg p-2 transition-all">
                        <span className="text-[#a855f7] text-base">•</span>
                        <span className="text-gray-300">
                          <strong className="text-white">Dạy học lập trình:</strong>
                          <span className="text-gray-400"> đào tạo từ cơ bản đến nâng cao, mentor dự án thực tế</span>
                        </span>
                      </div>
                      <div className="flex items-start space-x-2 group hover:bg-white/5 rounded-lg p-2 transition-all">
                        <span className="text-[#a855f7] text-base">•</span>
                        <span className="text-gray-300">
                          <strong className="text-white">Cloud & DevOps:</strong> 
                          <span className="text-gray-400"> AWS, Vercel, Docker, CI/CD pipelines</span>
                        </span>
                      </div>
                      
                      <div className="flex items-start space-x-2 group hover:bg-white/5 rounded-lg p-2 transition-all">
                        <span className="text-[#6366f1] text-base">•</span>
                        <span className="text-gray-300">
                          <strong className="text-white">Data & AI:</strong> 
                          <span className="text-gray-400"> analytics, AI chatbots, automated reporting</span>
                        </span>
                      </div>
                      
                      <div className="flex items-start space-x-2 group hover:bg-white/5 rounded-lg p-2 transition-all">
                        <span className="text-[#a855f7] text-base">•</span>
                        <span className="text-gray-300">
                          <strong className="text-white">Discord system:</strong>
                          <span className="text-gray-400"> setup, bot development, role management</span>
                        </span>
                      </div>


                      <div className="flex items-start space-x-2 group hover:bg-white/5 rounded-lg p-2 transition-all">
                        <span className="text-[#a855f7] text-base">•</span>
                        <span className="text-gray-300">
                          <strong className="text-white">Automation & Finance:</strong> 
                          <span className="text-gray-400"> n8n workflows, financial analysis tools</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-700/30">
                      <p className="text-center text-xs md:text-sm text-gray-300 italic">
                        Phương châm: <span className="text-[#6366f1] font-medium">Tối ưu thời gian</span> • 
                        <span className="text-[#a855f7] font-medium"> Tối đa hiệu quả</span> • 
                        <span className="text-[#6366f1] font-medium"> Giảm chi phí</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-col sm:flex-row gap-3 w-full justify-center lg:justify-start items-center"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <CTAButton
                    href="#Portofolio"
                    text="Projects"
                    icon={ExternalLink}
                  />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div
                  className="flex gap-3 md:gap-4 justify-center lg:justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1600"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Optimized Lottie Animation */}
            <div
              className="w-full lg:w-[45%] xl:w-1/2 h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] relative flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Background Glow Effects */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-60 scale-110" : "opacity-30 scale-100"
                  }`}
                ></div>

                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-700 ${
                    isHovering ? "scale-125 opacity-50" : "scale-100 opacity-20"
                  } animate-[pulse_4s_ease-in-out_infinite]`}
                ></div>

                {/* Main Animation Container */}
                <div
                  className={`relative z-10 w-full h-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px] transform transition-all duration-500 ${
                    isHovering ? "scale-105 rotate-1" : "scale-100"
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <DotLottieReact
                      src="/coding.json"
                      loop={true}
                      autoplay={true}
                      style={{ 
                        width: "90%", 
                        height: "90%",
                        filter: isHovering ? "drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))" : "none"
                      }}
                      className="transition-all duration-500"
                    />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-[#6366f1] rounded-full transition-all duration-700 ${isHovering ? "opacity-80 scale-150" : "opacity-40"} animate-[float_3s_ease-in-out_infinite]`}></div>
                <div className={`absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-[#a855f7] rounded-full transition-all duration-700 ${isHovering ? "opacity-80 scale-150" : "opacity-40"} animate-[float_4s_ease-in-out_infinite_reverse]`}></div>
                <div className={`absolute top-1/2 right-1/6 w-1 h-1 bg-white rounded-full transition-all duration-700 ${isHovering ? "opacity-80 scale-200" : "opacity-30"} animate-[float_5s_ease-in-out_infinite]`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
