import React, {useEffect, useState} from "react";

const ProgressBar = ({onFinished}) => {

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (progress > 99) {
            onFinished()
        }
    }, [progress])

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev > 99) {
                    clearInterval(interval)
                    return 100
                }
                return prev + 0.5
            })
        }, 100)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{width: progress+'%'}}></div>
        </div>
    )
}

export default ProgressBar