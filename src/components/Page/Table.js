import s from './Page.module.scss'

export default function Table({ head, rows }) {
    return (
        <div className={s['Page__TableWrap']}>
            <table className={s['Page__Table']}>
                <thead>
                    <tr>
                        {head.map((h) => (
                            <th key={h}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={i}>
                            {row.map((cell, j) => (
                                <td key={j}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
