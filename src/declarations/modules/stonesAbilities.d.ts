interface stonesAbilities {
    getStoneAbilities: (background?: boolean) => Promise<any>;
    setStoneAbilities: (data: any, background?: boolean) => Promise<any>;
}
