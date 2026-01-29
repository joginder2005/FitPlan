// Application State
let currentStep = 1;
let currentScreen = 'welcome';
let userData = {};
let workoutPlan = {};
let mealPlan = {};
let currentWorkoutDay = 'day1';
let currentMealDay = 'monday';

// Sample data from the application
const appData = {
    "sampleUser": {
        "age": 20,
        "gender": "male",
        "height": 175,
        "weight": 74,
        "targetWeight": 70,
        "goal": "weight_loss",
        "activityLevel": "lightly_active",
        "dietaryPreference": "vegetarian",
        "budget": 2000,
        "location": "Bangalore",
        "gymAccess": false,
        "timeline": "8 weeks"
    },
    "sampleWorkout": {
        "day1": {
            "name": "Full Body Strength",
            "duration": 30,
            "exercises": [
                {"name": "Warm-up March", "duration": "3 min", "sets": 1, "reps": "", "equipment": "none"},
                {"name": "Squats", "duration": "", "sets": 3, "reps": 12, "equipment": "bodyweight"},
                {"name": "Push-ups", "duration": "", "sets": 3, "reps": 8, "equipment": "bodyweight"},
                {"name": "Resistance Band Rows", "duration": "", "sets": 3, "reps": 12, "equipment": "resistance band"},
                {"name": "Plank", "duration": "30s", "sets": 3, "reps": "", "equipment": "none"},
                {"name": "Stretching", "duration": "4 min", "sets": 1, "reps": "", "equipment": "none"}
            ]
        }
    },
    "sampleMeals": {
        "monday": {
            "breakfast": {"name": "Upma with Curd", "calories": 320, "protein": 12, "carbs": 45, "fats": 8, "cost": 25, "cookTime": 15},
            "snack1": {"name": "Banana with Peanuts", "calories": 180, "protein": 6, "carbs": 22, "fats": 8, "cost": 15, "cookTime": 2},
            "lunch": {"name": "2 Chapati + Dal + Sabzi + Salad", "calories": 450, "protein": 18, "carbs": 65, "fats": 12, "cost": 45, "cookTime": 30},
            "snack2": {"name": "Sprout Chaat", "calories": 150, "protein": 8, "carbs": 25, "fats": 3, "cost": 20, "cookTime": 10},
            "dinner": {"name": "Brown Rice + Rajma + Cucumber Raita", "calories": 420, "protein": 16, "carbs": 70, "fats": 8, "cost": 40, "cookTime": 25}
        }
    },
    "nutritionalGoals": {
        "dailyCalories": 1800,
        "proteinGrams": 90,
        "carbsGrams": 225,
        "fatsGrams": 60,
        "weeklyBudget": 500
    },
    "exerciseCategories": ["Strength Training", "Cardio", "Flexibility", "HIIT", "Yoga"],
    "dietaryOptions": ["Vegetarian", "Vegan", "Non-Vegetarian", "Eggetarian", "Jain"],
    "fitnessGoals": ["Weight Loss", "Muscle Gain", "Maintenance", "Endurance", "Strength"],
    "activityLevels": ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"],
    "equipmentOptions": ["No Equipment", "Basic (Resistance Bands)", "Home Gym", "Full Gym Access"],
    "motivationalQuotes": [
        "Every workout is a step closer to your goal!",
        "Your body can do it. It's your mind you need to convince.",
        "Progress, not perfection.",
        "The only bad workout is the one that didn't happen.",
        "Small changes lead to big results."
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showRandomQuote();
    initializeEventListeners();
});

function initializeEventListeners() {
    // Goal selection
    document.querySelectorAll('.goal-card').forEach(card => {
        card.addEventListener('click', function() {
            selectGoal(this.dataset.goal);
        });
    });

    // Activity level selection
    document.querySelectorAll('.activity-card').forEach(card => {
        card.addEventListener('click', function() {
            selectActivity(this.dataset.activity);
        });
    });
}

function showRandomQuote() {
    const quotes = appData.motivationalQuotes;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteElement = document.getElementById('motivational-quote');
    if (quoteElement) {
        quoteElement.textContent = `"${randomQuote}"`;
    }
}

function startOnboarding() {
    switchScreen('onboarding');
    currentStep = 1;
    updateProgressBar();
}

function switchScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });

    // Show target screen
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
        targetScreen.classList.add('active');
    }
    
    currentScreen = screenName;
}

function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const currentStepElement = document.getElementById('current-step');
    
    if (progressFill) {
        const percentage = (currentStep / 6) * 100;
        progressFill.style.width = `${percentage}%`;
    }
    
    if (currentStepElement) {
        currentStepElement.textContent = currentStep;
    }
}

function selectGoal(goal) {
    // Remove previous selection
    document.querySelectorAll('.goal-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    event.target.closest('.goal-card').classList.add('selected');
    userData.goal = goal;
    
    // Show target weight input for weight loss
    const targetWeightGroup = document.getElementById('target-weight-group');
    if (goal === 'weight_loss' && targetWeightGroup) {
        targetWeightGroup.style.display = 'block';
    } else if (targetWeightGroup) {
        targetWeightGroup.style.display = 'none';
    }
}

function selectActivity(activity) {
    // Remove previous selection
    document.querySelectorAll('.activity-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selection to clicked card
    event.target.closest('.activity-card').classList.add('selected');
    userData.activityLevel = activity;
}

function nextStep() {
    if (validateCurrentStep()) {
        collectCurrentStepData();
        
        // Hide current step
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
            currentStepElement.classList.add('hidden');
        }
        
        currentStep++;
        
        // Show next step
        const nextStepElement = document.getElementById(`step-${currentStep}`);
        if (nextStepElement) {
            nextStepElement.classList.remove('hidden');
            nextStepElement.classList.add('active');
        }
        
        updateProgressBar();
    }
}

function prevStep() {
    // Hide current step
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    if (currentStepElement) {
        currentStepElement.classList.remove('active');
        currentStepElement.classList.add('hidden');
    }
    
    currentStep--;
    
    // Show previous step
    const prevStepElement = document.getElementById(`step-${currentStep}`);
    if (prevStepElement) {
        prevStepElement.classList.remove('hidden');
        prevStepElement.classList.add('active');
    }
    
    updateProgressBar();
}

function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            return validatePersonalDetails();
        case 2:
            return validateGoals();
        case 3:
            return validateActivity();
        case 4:
            return validateDietBudget();
        case 5:
            return validateEquipment();
        case 6:
            return true; // Health info is optional
        default:
            return true;
    }
}

function validatePersonalDetails() {
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    
    if (!age || !gender || !height || !weight) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    return true;
}

function validateGoals() {
    if (!userData.goal) {
        alert('Please select your fitness goal.');
        return false;
    }
    
    const targetWeightInput = document.getElementById('target-weight');
    if (userData.goal === 'weight_loss' && targetWeightInput && !targetWeightInput.value) {
        alert('Please enter your target weight.');
        return false;
    }
    
    return true;
}

function validateActivity() {
    if (!userData.activityLevel) {
        alert('Please select your activity level.');
        return false;
    }
    return true;
}

function validateDietBudget() {
    const dietPreference = document.getElementById('diet-preference').value;
    const budget = document.getElementById('monthly-budget').value;
    const location = document.getElementById('location').value;
    
    if (!dietPreference || !budget || !location) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    return true;
}

function validateEquipment() {
    const equipment = document.getElementById('equipment').value;
    const workoutTime = document.getElementById('workout-time').value;
    
    if (!equipment || !workoutTime) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    return true;
}

function collectCurrentStepData() {
    switch(currentStep) {
        case 1:
            userData.age = parseInt(document.getElementById('age').value);
            userData.gender = document.getElementById('gender').value;
            userData.height = parseInt(document.getElementById('height').value);
            userData.weight = parseInt(document.getElementById('weight').value);
            break;
        case 2:
            const targetWeightInput = document.getElementById('target-weight');
            if (targetWeightInput && targetWeightInput.value) {
                userData.targetWeight = parseInt(targetWeightInput.value);
            }
            break;
        case 4:
            userData.dietaryPreference = document.getElementById('diet-preference').value;
            userData.budget = parseInt(document.getElementById('monthly-budget').value);
            userData.location = document.getElementById('location').value;
            break;
        case 5:
            userData.equipment = document.getElementById('equipment').value;
            userData.workoutTime = parseInt(document.getElementById('workout-time').value);
            break;
        case 6:
            userData.healthConditions = document.getElementById('health-conditions').value;
            userData.foodAllergies = document.getElementById('food-allergies').value;
            break;
    }
}

function completeOnboarding() {
    collectCurrentStepData();
    showLoadingOverlay(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
        generatePersonalizedPlans();
        setupDashboard();
        showLoadingOverlay(false);
        switchScreen('dashboard');
        showSection('dashboard');
    }, 2000);
}

function showLoadingOverlay(show) {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
        if (show) {
            overlay.classList.remove('hidden');
        } else {
            overlay.classList.add('hidden');
        }
    }
}

function generatePersonalizedPlans() {
    generateWorkoutPlan();
    generateMealPlan();
}

function generateWorkoutPlan() {
    const workouts = {
        day1: {
            name: "Full Body Strength",
            duration: userData.workoutTime || 30,
            exercises: [
                {name: "Warm-up March", duration: "3 min", sets: 1, reps: "", equipment: "none"},
                {name: "Squats", duration: "", sets: 3, reps: 12, equipment: "bodyweight"},
                {name: "Push-ups", duration: "", sets: 3, reps: userData.gender === 'female' ? 6 : 8, equipment: "bodyweight"},
                {name: "Plank", duration: "30s", sets: 3, reps: "", equipment: "none"},
                {name: "Jumping Jacks", duration: "30s", sets: 3, reps: "", equipment: "none"},
                {name: "Cool-down Stretch", duration: "5 min", sets: 1, reps: "", equipment: "none"}
            ]
        },
        day2: {
            name: "Cardio & Core",
            duration: userData.workoutTime || 30,
            exercises: [
                {name: "Warm-up Jog", duration: "3 min", sets: 1, reps: "", equipment: "none"},
                {name: "High Knees", duration: "30s", sets: 4, reps: "", equipment: "none"},
                {name: "Mountain Climbers", duration: "30s", sets: 3, reps: "", equipment: "none"},
                {name: "Russian Twists", duration: "", sets: 3, reps: 20, equipment: "none"},
                {name: "Bicycle Crunches", duration: "", sets: 3, reps: 15, equipment: "none"},
                {name: "Cool-down Walk", duration: "5 min", sets: 1, reps: "", equipment: "none"}
            ]
        },
        day3: {
            name: "Upper Body Focus",
            duration: userData.workoutTime || 30,
            exercises: [
                {name: "Arm Circles", duration: "2 min", sets: 1, reps: "", equipment: "none"},
                {name: "Wall Push-ups", duration: "", sets: 3, reps: 10, equipment: "none"},
                {name: "Pike Push-ups", duration: "", sets: 3, reps: 8, equipment: "none"},
                {name: "Tricep Dips", duration: "", sets: 3, reps: 10, equipment: "chair"},
                {name: "Arm Raises", duration: "", sets: 3, reps: 12, equipment: "none"},
                {name: "Shoulder Stretch", duration: "3 min", sets: 1, reps: "", equipment: "none"}
            ]
        },
        day4: {
            name: "Lower Body Power",
            duration: userData.workoutTime || 30,
            exercises: [
                {name: "Leg Swings", duration: "2 min", sets: 1, reps: "", equipment: "none"},
                {name: "Squats", duration: "", sets: 4, reps: 15, equipment: "bodyweight"},
                {name: "Lunges", duration: "", sets: 3, reps: 10, equipment: "bodyweight"},
                {name: "Calf Raises", duration: "", sets: 3, reps: 20, equipment: "none"},
                {name: "Wall Sit", duration: "45s", sets: 3, reps: "", equipment: "none"},
                {name: "Leg Stretch", duration: "4 min", sets: 1, reps: "", equipment: "none"}
            ]
        },
        day5: {
            name: "HIIT Circuit",
            duration: userData.workoutTime || 30,
            exercises: [
                {name: "Dynamic Warm-up", duration: "3 min", sets: 1, reps: "", equipment: "none"},
                {name: "Burpees", duration: "30s", sets: 3, reps: "", equipment: "none"},
                {name: "Jump Squats", duration: "30s", sets: 3, reps: "", equipment: "none"},
                {name: "Push-up to T", duration: "30s", sets: 3, reps: "", equipment: "none"},
                {name: "Sprint in Place", duration: "30s", sets: 3, reps: "", equipment: "none"},
                {name: "Recovery Stretch", duration: "5 min", sets: 1, reps: "", equipment: "none"}
            ]
        },
        day6: {
            name: "Flexibility & Recovery",
            duration: userData.workoutTime || 30,
            exercises: [
                {name: "Gentle Movement", duration: "3 min", sets: 1, reps: "", equipment: "none"},
                {name: "Forward Fold", duration: "1 min", sets: 3, reps: "", equipment: "none"},
                {name: "Spinal Twist", duration: "1 min", sets: 3, reps: "", equipment: "none"},
                {name: "Hip Circles", duration: "1 min", sets: 3, reps: "", equipment: "none"},
                {name: "Child's Pose", duration: "2 min", sets: 2, reps: "", equipment: "none"},
                {name: "Deep Breathing", duration: "5 min", sets: 1, reps: "", equipment: "none"}
            ]
        },
        day7: {
            name: "Active Recovery",
            duration: userData.workoutTime || 30,
            exercises: [
                {name: "Easy Walk", duration: "10 min", sets: 1, reps: "", equipment: "none"},
                {name: "Gentle Stretching", duration: "10 min", sets: 1, reps: "", equipment: "none"},
                {name: "Meditation", duration: "10 min", sets: 1, reps: "", equipment: "none"}
            ]
        }
    };
    
    workoutPlan = workouts;
}

function generateMealPlan() {
    const isVeg = userData.dietaryPreference === 'vegetarian' || userData.dietaryPreference === 'vegan';
    const dailyBudget = Math.floor(userData.budget / 30);
    
    const meals = {
        monday: {
            breakfast: {name: "Upma with Curd", calories: 320, protein: 12, carbs: 45, fats: 8, cost: 25, cookTime: 15},
            snack1: {name: "Banana with Peanuts", calories: 180, protein: 6, carbs: 22, fats: 8, cost: 15, cookTime: 2},
            lunch: {name: "2 Chapati + Dal + Sabzi + Salad", calories: 450, protein: 18, carbs: 65, fats: 12, cost: 45, cookTime: 30},
            snack2: {name: "Sprout Chaat", calories: 150, protein: 8, carbs: 25, fats: 3, cost: 20, cookTime: 10},
            dinner: {name: "Brown Rice + Rajma + Cucumber Raita", calories: 420, protein: 16, carbs: 70, fats: 8, cost: 40, cookTime: 25}
        },
        tuesday: {
            breakfast: {name: "Poha with Peanuts", calories: 300, protein: 10, carbs: 50, fats: 6, cost: 20, cookTime: 12},
            snack1: {name: "Apple with Almonds", calories: 200, protein: 5, carbs: 25, fats: 10, cost: 18, cookTime: 1},
            lunch: {name: "Rice + Sambar + Vegetable Curry", calories: 480, protein: 15, carbs: 75, fats: 10, cost: 50, cookTime: 35},
            snack2: {name: "Roasted Chana", calories: 120, protein: 6, carbs: 18, fats: 2, cost: 12, cookTime: 0},
            dinner: {name: "2 Chapati + Palak Dal + Mixed Veg", calories: 400, protein: 17, carbs: 60, fats: 9, cost: 42, cookTime: 28}
        },
        wednesday: {
            breakfast: {name: "Idli with Sambar & Chutney", calories: 280, protein: 11, carbs: 48, fats: 4, cost: 22, cookTime: 10},
            snack1: {name: "Dates with Nuts", calories: 160, protein: 4, carbs: 28, fats: 6, cost: 16, cookTime: 1},
            lunch: {name: "Curd Rice + Pickle + Papad", calories: 420, protein: 14, carbs: 68, fats: 8, cost: 35, cookTime: 15},
            snack2: {name: "Fruit Salad", calories: 140, protein: 2, carbs: 32, fats: 1, cost: 25, cookTime: 5},
            dinner: {name: "Khichdi with Ghee + Pickle", calories: 380, protein: 12, carbs: 65, fats: 8, cost: 30, cookTime: 20}
        },
        thursday: {
            breakfast: {name: "Besan Cheela with Chutney", calories: 310, protein: 14, carbs: 35, fats: 12, cost: 24, cookTime: 18},
            snack1: {name: "Buttermilk with Biscuits", calories: 170, protein: 5, carbs: 28, fats: 5, cost: 14, cookTime: 3},
            lunch: {name: "2 Roti + Chana Masala + Rice", calories: 490, protein: 20, carbs: 72, fats: 11, cost: 48, cookTime: 32},
            snack2: {name: "Puffed Rice Chaat", calories: 130, protein: 4, carbs: 24, fats: 2, cost: 15, cookTime: 8},
            dinner: {name: "Vegetable Pulao + Raita + Pickle", calories: 410, protein: 13, carbs: 68, fats: 9, cost: 38, cookTime: 25}
        },
        friday: {
            breakfast: {name: "Paratha with Curd", calories: 340, protein: 12, carbs: 42, fats: 14, cost: 28, cookTime: 20},
            snack1: {name: "Seasonal Fruit", calories: 150, protein: 2, carbs: 35, fats: 0, cost: 20, cookTime: 1},
            lunch: {name: "South Indian Thali", calories: 520, protein: 18, carbs: 78, fats: 15, cost: 55, cookTime: 40},
            snack2: {name: "Tea with Marie Biscuits", calories: 140, protein: 3, carbs: 24, fats: 4, cost: 12, cookTime: 3},
            dinner: {name: "Dal Rice with Sabzi", calories: 430, protein: 16, carbs: 72, fats: 8, cost: 40, cookTime: 30}
        },
        saturday: {
            breakfast: {name: "Dosa with Sambar & Chutney", calories: 320, protein: 12, carbs: 52, fats: 6, cost: 26, cookTime: 15},
            snack1: {name: "Roasted Peanuts", calories: 180, protein: 8, carbs: 6, fats: 14, cost: 15, cookTime: 0},
            lunch: {name: "Pav Bhaji", calories: 480, protein: 14, carbs: 70, fats: 16, cost: 45, cookTime: 25},
            snack2: {name: "Lassi", calories: 160, protein: 6, carbs: 24, fats: 4, cost: 18, cookTime: 5},
            dinner: {name: "Biryani with Raita", calories: 450, protein: 15, carbs: 75, fats: 10, cost: 50, cookTime: 35}
        },
        sunday: {
            breakfast: {name: "Aloo Paratha with Pickle", calories: 360, protein: 10, carbs: 48, fats: 16, cost: 32, cookTime: 25},
            snack1: {name: "Mixed Nuts", calories: 200, protein: 6, carbs: 8, fats: 18, cost: 22, cookTime: 0},
            lunch: {name: "Special Thali", calories: 550, protein: 22, carbs: 80, fats: 18, cost: 60, cookTime: 45},
            snack2: {name: "Fresh Coconut Water", calories: 100, protein: 2, carbs: 22, fats: 0, cost: 25, cookTime: 0},
            dinner: {name: "Simple Dal Rice", calories: 380, protein: 14, carbs: 68, fats: 6, cost: 35, cookTime: 20}
        }
    };
    
    mealPlan = meals;
}

function setupDashboard() {
    // Calculate and display BMI
    const bmi = calculateBMI(userData.weight, userData.height);
    document.getElementById('current-bmi').textContent = bmi.toFixed(1);
    
    // Set target weight
    const targetWeightDisplay = document.getElementById('target-weight-display');
    if (targetWeightDisplay && userData.targetWeight) {
        targetWeightDisplay.textContent = userData.targetWeight;
        const diff = userData.targetWeight - userData.weight;
        document.getElementById('weight-diff').textContent = `${diff > 0 ? '+' : ''}${diff}kg`;
    }
    
    // Set weekly budget
    const weeklyBudget = Math.floor(userData.budget / 4);
    document.getElementById('weekly-budget').textContent = weeklyBudget;
    
    // Update welcome message
    document.getElementById('welcome-message').textContent = `Welcome back!`;
    
    // Initialize current weight input
    const currentWeightInput = document.getElementById('current-weight-input');
    if (currentWeightInput) {
        currentWeightInput.value = userData.weight;
    }
}

function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

function showSection(sectionName) {
    // Update navigation - find the clicked nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate the correct nav link
    const sectionMap = {
        'dashboard': 'Dashboard',
        'workout': 'Workouts', 
        'meals': 'Meals',
        'progress': 'Progress',
        'education': 'Tips',
        'settings': 'Settings'
    };
    
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.textContent === sectionMap[sectionName]) {
            link.classList.add('active');
        }
    });
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
        section.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active');
    }
    
    // Load content for specific sections
    if (sectionName === 'workout') {
        showWorkoutDay(currentWorkoutDay);
    } else if (sectionName === 'meals') {
        showMealDay(currentMealDay);
    }
}

function showWorkoutDay(day) {
    currentWorkoutDay = day;
    
    // Update tabs
    document.querySelectorAll('.workout-tabs .tab-btn').forEach((btn, index) => {
        btn.classList.remove('active');
        if (btn.textContent === `Day ${day.slice(-1)}`) {
            btn.classList.add('active');
        }
    });
    
    // Display workout content
    const workout = workoutPlan[day];
    if (!workout) return;
    
    const content = `
        <div class="workout-day">
            <div class="workout-header">
                <h3>${workout.name}</h3>
                <div class="workout-meta">
                    <span>⏱️ ${workout.duration} minutes</span>
                    <span>💪 ${workout.exercises.length} exercises</span>
                </div>
            </div>
            <div class="exercises-list">
                ${workout.exercises.map(exercise => `
                    <div class="exercise-item">
                        <div class="exercise-header">
                            <h4 class="exercise-name">${exercise.name}</h4>
                            <span class="exercise-equipment">${exercise.equipment}</span>
                        </div>
                        <div class="exercise-details">
                            ${exercise.sets ? `<span class="exercise-detail">🔄 ${exercise.sets} sets</span>` : ''}
                            ${exercise.reps ? `<span class="exercise-detail">📊 ${exercise.reps} reps</span>` : ''}
                            ${exercise.duration ? `<span class="exercise-detail">⏲️ ${exercise.duration}</span>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('workout-day-content').innerHTML = content;
}

function showMealDay(day) {
    currentMealDay = day;
    
    // Update tabs
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    document.querySelectorAll('.meal-tabs .tab-btn').forEach((btn, index) => {
        btn.classList.remove('active');
        if (dayNames[index] === day) {
            btn.classList.add('active');
        }
    });
    
    // Display meal content
    const meals = mealPlan[day];
    if (!meals) return;
    
    const totalCalories = Object.values(meals).reduce((sum, meal) => sum + meal.calories, 0);
    const totalProtein = Object.values(meals).reduce((sum, meal) => sum + meal.protein, 0);
    const totalCost = Object.values(meals).reduce((sum, meal) => sum + meal.cost, 0);
    
    const content = `
        <div class="meal-day">
            <div class="meal-summary">
                <h3>${day.charAt(0).toUpperCase() + day.slice(1)}'s Meals</h3>
                <div class="daily-totals">
                    <div class="total-item">
                        <div class="total-value">${totalCalories}</div>
                        <div class="total-label">Calories</div>
                    </div>
                    <div class="total-item">
                        <div class="total-value">${totalProtein}g</div>
                        <div class="total-label">Protein</div>
                    </div>
                    <div class="total-item">
                        <div class="total-value">₹${totalCost}</div>
                        <div class="total-label">Cost</div>
                    </div>
                </div>
            </div>
            <div class="meals-list">
                ${Object.entries(meals).map(([mealType, meal]) => `
                    <div class="meal-item">
                        <div class="meal-header">
                            <span class="meal-type">${mealType.replace('snack1', 'Morning Snack').replace('snack2', 'Evening Snack')}</span>
                            <span class="meal-cost">₹${meal.cost}</span>
                        </div>
                        <div class="meal-name">${meal.name}</div>
                        <div class="meal-macros">
                            <div class="macro-item">
                                <div class="macro-value">${meal.calories}</div>
                                <div class="macro-label">Cal</div>
                            </div>
                            <div class="macro-item">
                                <div class="macro-value">${meal.protein}g</div>
                                <div class="macro-label">Protein</div>
                            </div>
                            <div class="macro-item">
                                <div class="macro-value">${meal.carbs}g</div>
                                <div class="macro-label">Carbs</div>
                            </div>
                            <div class="macro-item">
                                <div class="macro-value">${meal.fats}g</div>
                                <div class="macro-label">Fats</div>
                            </div>
                        </div>
                        <div class="meal-meta">
                            <span>🍳 ${meal.cookTime} min cook time</span>
                            <span>💡 Easy to make</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('meal-day-content').innerHTML = content;
}

function generateWorkout() {
    showLoadingOverlay(true);
    setTimeout(() => {
        generateWorkoutPlan();
        showWorkoutDay(currentWorkoutDay);
        showLoadingOverlay(false);
    }, 1500);
}

function generateMeals() {
    showLoadingOverlay(true);
    setTimeout(() => {
        generateMealPlan();
        showMealDay(currentMealDay);
        showLoadingOverlay(false);
    }, 1500);
}

function generateShoppingList() {
    const ingredients = [
        { name: "Rice (1kg)", quantity: "1 packet" },
        { name: "Dal/Lentils", quantity: "500g" },
        { name: "Chapati Flour", quantity: "1kg" },
        { name: "Vegetables (Mixed)", quantity: "2kg" },
        { name: "Onions", quantity: "1kg" },
        { name: "Tomatoes", quantity: "500g" },
        { name: "Curd", quantity: "500ml" },
        { name: "Milk", quantity: "1L" },
        { name: "Bananas", quantity: "1 dozen" },
        { name: "Apples", quantity: "1kg" },
        { name: "Peanuts", quantity: "200g" },
        { name: "Almonds", quantity: "100g" },
        { name: "Oil", quantity: "500ml" },
        { name: "Spices", quantity: "As needed" }
    ];
    
    const shoppingListHTML = `
        <ul class="shopping-list">
            ${ingredients.map(item => `
                <li class="shopping-item">
                    <span class="item-name">${item.name}</span>
                    <span class="item-quantity">${item.quantity}</span>
                </li>
            `).join('')}
        </ul>
        <div style="margin-top: 20px; text-align: center; color: var(--color-text-secondary);">
            <p>Estimated weekly cost: ₹${Math.floor(userData.budget / 4)}</p>
        </div>
    `;
    
    document.getElementById('shopping-list-content').innerHTML = shoppingListHTML;
    document.getElementById('shopping-modal').classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

function updateWeight() {
    const newWeight = parseFloat(document.getElementById('current-weight-input').value);
    if (newWeight && newWeight > 0) {
        userData.weight = newWeight;
        const bmi = calculateBMI(userData.weight, userData.height);
        document.getElementById('current-bmi').textContent = bmi.toFixed(1);
        alert('Weight updated successfully!');
    }
}

function editProfile() {
    alert('Profile editing feature would open a form to modify your personal information.');
}

function updateGoals() {
    alert('Goals updating feature would allow you to change your fitness goals and preferences.');
}

function resetApp() {
    if (confirm('Are you sure you want to reset the application? This will clear all your data.')) {
        userData = {};
        workoutPlan = {};
        mealPlan = {};
        switchScreen('welcome');
        showRandomQuote();
    }
}

// Global event delegation
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // Handle workout day tabs
    if (target.classList.contains('tab-btn') && target.closest('.workout-tabs')) {
        const dayNumber = target.textContent.replace('Day ', '');
        const dayKey = `day${dayNumber}`;
        showWorkoutDay(dayKey);
    }
    
    // Handle meal day tabs
    if (target.classList.contains('tab-btn') && target.closest('.meal-tabs')) {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const dayIndex = Array.from(target.parentNode.children).indexOf(target);
        if (dayIndex >= 0 && dayIndex < days.length) {
            showMealDay(days[dayIndex]);
        }
    }
    
    // Handle navigation links
    if (target.classList.contains('nav-link')) {
        const section = target.textContent.toLowerCase();
        const sectionMap = {
            'dashboard': 'dashboard',
            'workouts': 'workout',
            'meals': 'meals',
            'progress': 'progress',
            'tips': 'education',
            'settings': 'settings'
        };
        
        if (sectionMap[section]) {
            showSection(sectionMap[section]);
        }
    }
});
