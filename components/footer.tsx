import Image from "next/image"
import Link from "next/link"
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-icon-FPeqo7PfR2Va5HJPM4fc3uvAiuGH3f.png"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <span className="ml-3 text-xl font-medium text-gray-900">FlowWave</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              Transforming digital experiences with intuitive design and powerful functionality.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Updates
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} FlowWave, Inc. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
