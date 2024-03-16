import { DependencyList, useEffect, useState } from "react";

export function useAsync<T>(load: (data?: string) => Promise<T>, onResult: (data: T) => void, dependencies: DependencyList) {

    return useEffect(() => {
        let isCancelled = false;
        load().then((result) => {
            if (!isCancelled) {
                onResult(result)
            }
        });            

        return () => {
            isCancelled = true;
        };

    }, dependencies)
}