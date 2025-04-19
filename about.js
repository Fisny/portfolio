function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

document.addEventListener("DOMContentLoaded", function () {
    const birthDate = new Date(1999, 4, 8);
    const age = calculateAge(birthDate);
    document.getElementById("aboutAge").textContent = age;
}) 