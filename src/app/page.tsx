import Link from "next/link";
import ClientHomeQuickJoin from "@/components/ClientHomeQuickJoin";

export default function Home() {
  const features = [
    {
      icon: (
        <span aria-hidden className="text-blue-600">
          ⚡
        </span>
      ),
      title: "Real-time Battles",
      description: "Compete with friends in live flashcard challenges",
    },
    {
      icon: (
        <span aria-hidden className="text-blue-600">
          👥
        </span>
      ),
      title: "Multiplayer Mode",
      description: "Study with classmates or challenge friends",
    },
    {
      icon: (
        <span aria-hidden className="text-blue-600">
          🏆
        </span>
      ),
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics",
    },
    {
      icon: (
        <span aria-hidden className="text-blue-600">
          📚
        </span>
      ),
      title: "Rich Content",
      description: "Create and share custom flashcard decks",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                ⚡
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                FlashcardFrenzy
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/player"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                Player
              </Link>
              <Link
                href="/teacher"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                Teacher
              </Link>
              <Link
                href="/#features"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                Features
              </Link>
              <Link
                href="/#how-it-works"
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
              >
                How It Works
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm transition-all"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Master Any Subject with</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Flashcard Frenzy
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Transform your study sessions into exciting multiplayer battles.
                Learn faster, remember more, and have fun while doing it.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/signup"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Start Learning Free
                </Link>
                <Link
                  href="/#how-it-works"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors"
                >
                  How It Works
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -right-40 -top-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute -left-40 -bottom-40 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute -left-20 -top-20 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Supercharge Your Learning
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Everything you need to make learning engaging and effective
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center p-3 rounded-md bg-white shadow-lg">
                        {feature.icon}
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Get started in minutes with our simple setup process
              </p>
            </div>

            <div className="mt-16">
              <div className="relative">
                <div className="hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-gray-200"></div>

                <div className="relative md:grid md:grid-cols-2 md:gap-8">
                  <div className="mb-10 md:mb-0">
                    <div className="flex flex-col items-center md:items-end md:pr-8">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-lg font-bold">
                        1
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">
                        Create or Join a Room
                      </h3>
                      <p className="mt-2 text-base text-gray-500 text-center md:text-right">
                        Start a new study session or join an existing one with a
                        room code
                      </p>
                    </div>
                  </div>

                  <div className="relative pb-10">
                    <div className="md:absolute md:top-0 md:left-0 md:pl-8">
                      <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-lg font-bold">
                          2
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                          Choose Your Deck
                        </h3>
                        <p className="mt-2 text-base text-gray-500 text-center md:text-left">
                          Select from our library of flashcards or create your
                          own
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative md:grid md:grid-cols-2 md:gap-8">
                  <div className="mb-10 md:mb-0">
                    <div className="flex flex-col items-center md:items-end md:pr-8">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white text-lg font-bold">
                        3
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">
                        Battle It Out
                      </h3>
                      <p className="mt-2 text-base text-gray-500 text-center md:text-right">
                        Answer questions faster than your opponent to win points
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="md:absolute md:top-0 md:left-0 md:pl-8">
                      <div className="flex flex-col items-center md:items-start">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white text-lg font-bold">
                          4
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                          Track Your Progress
                        </h3>
                        <p className="mt-2 text-base text-gray-500 text-center md:text-left">
                          Review your performance and improve over time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">
                Ready to transform your study sessions?
              </span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-blue-100">
              Join thousands of students who are learning better with Flashcard
              Frenzy
            </p>
            <Link
              href="/signup"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
            >
              Get Started for Free →
            </Link>
          </div>
        </section>

        {/* Quick Join Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Join a Game Instantly
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                Enter a room code to join an existing game session
              </p>
            </div>
            <div className="mt-10 max-w-md mx-auto">
              <ClientHomeQuickJoin />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-500">
          Flashcard Frenzy Multiplayer
        </div>
      </footer>
    </div>
  );
}

function NavCard({
  title,
  href,
  desc,
}: {
  title: string;
  href: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border p-4 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="font-medium">{title}</div>
      <div className="text-sm text-gray-600">{desc}</div>
    </Link>
  );
}
