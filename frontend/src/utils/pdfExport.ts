import jsPDF from "jspdf";

export function exportAIReport(report: any) {

    const pdf = new jsPDF();

    let y = 20;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text("MediInsight AI", 20, y);

    y += 10;

    pdf.setFontSize(15);
    pdf.text("Medical Analysis Report", 20, y);

    y += 15;

    pdf.setDrawColor(0);
    pdf.line(20, y, 190, y);

    y += 10;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    pdf.text(`Patient : ${report.patient_name ?? "-"}`, 20, y);
    y += 8;

    pdf.text(`Hospital : ${report.hospital ?? "-"}`, 20, y);
    y += 8;

    pdf.text(`Doctor : ${report.doctor ?? "-"}`, 20, y);
    y += 8;

    pdf.text(`Document Type : ${report.document_type ?? "-"}`, 20, y);
    y += 8;

    pdf.text(`Total Charges : ₹ ${report.total_charges ?? "-"}`, 20, y);

    y += 15;

    pdf.setFont("helvetica", "bold");
    pdf.text("Summary", 20, y);

    y += 8;

    pdf.setFont("helvetica", "normal");

    const summary = pdf.splitTextToSize(
        report.summary ?? "No summary available.",
        170,
    );

    pdf.text(summary, 20, y);

    y += summary.length * 7 + 12;

    pdf.setFont("helvetica", "bold");
    pdf.text("Procedures", 20, y);

    y += 10;

    pdf.setFont("helvetica", "normal");

    if (
        report.procedures &&
        report.procedures.length > 0
    ) {

        report.procedures.forEach((procedure: any) => {

            pdf.text(
                `${procedure.date} | ${procedure.code}`,
                20,
                y,
            );

            y += 6;

            pdf.text(
                `${procedure.description}`,
                28,
                y,
            );

            y += 6;

            pdf.text(
                `Charge : ₹ ${procedure.charge}`,
                28,
                y,
            );

            y += 10;

            if (y > 270) {

                pdf.addPage();

                y = 20;

            }

        });

    }

    y += 5;

    pdf.setFont("helvetica", "bold");

    pdf.text("Patient Advice", 20, y);

    y += 8;

    pdf.setFont("helvetica", "normal");

    report.patient_advice?.forEach((item: string) => {

        pdf.text(`• ${item}`, 24, y);

        y += 7;

    });

    y += 5;

    pdf.setFont("helvetica", "bold");

    pdf.text("Medical Terms", 20, y);

    y += 8;

    pdf.setFont("helvetica", "normal");

    report.medical_terms?.forEach((term: any) => {

        pdf.text(
            `${term.term} : ${term.meaning}`,
            24,
            y,
        );

        y += 7;

        if (y > 270) {

            pdf.addPage();

            y = 20;

        }

    });

    pdf.save(
        `MediInsight_Report_${report.patient_name ?? "Patient"}.pdf`,
    );

}