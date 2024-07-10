// utils.ts
export function calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function isAdult(dob: string): boolean {
    return calculateAge(dob) >= 18;
}
