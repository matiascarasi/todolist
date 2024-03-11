import { useFocusEffect } from "@react-navigation/native";
import { DependencyList, useCallback, useEffect, useState } from "react"

export const useFetch = (url: string, dependencies: DependencyList) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    
    useFocusEffect(
        useCallback( 
            () => { 
                const abortController = new AbortController();

                const getData = async () => {
                    setIsLoading(true);
                    try {
                        const res = await fetch(url);
                        const data = await res.json();
                        setData(data);
                    } catch(e: any) {
                        setError(e);
                    } finally {
                        setIsLoading(false);
                    }
                }

                getData();

                return () => {
                    abortController.abort();
                };
            },
            dependencies
        )
    )

    return { data, isLoading, error }

} 