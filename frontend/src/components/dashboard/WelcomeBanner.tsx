function WelcomeBanner() {

    const hour = new Date().getHours();

    let greeting = "Welcome";

    if (hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour < 18) {

        greeting = "Good Afternoon";

    }

    else {

        greeting = "Good Evening";

    }

    return (

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 shadow-lg mb-8">

            <h1 className="text-4xl font-bold">

                👋 {greeting}

            </h1>

            <p className="mt-3 text-blue-100 text-lg">

                Welcome to MediInsight AI

            </p>

            <p className="mt-2 text-blue-200">

                Analyze hospital bills, prescriptions and reports using Artificial Intelligence.

            </p>

        </div>

    );

}

export default WelcomeBanner;