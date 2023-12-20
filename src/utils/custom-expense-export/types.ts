interface Rule{
    name: string, //naming this because I want to define static rules with automatic field matching
    rule: Function,
};

interface DataField {
    title: string,
    rule: Rule
};