package gal.iesteis.backend.fct;

import java.time.LocalDate;

import gal.iesteis.backend.alumno.Alumno;
import gal.iesteis.backend.tutorEmpresa.TutorEmpresa;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "fct")
public class FCT {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "alumno_id", nullable = false, foreignKey = @ForeignKey(name = "fk_fct_alumno"))
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "tutor_empresa_id", nullable = false, foreignKey = @ForeignKey(name = "fk_fct_tutor_empresa_id"))
    private TutorEmpresa tutorEmpresa;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio;

    @Column(name = "fecha_fin")
    private LocalDate fechaFin;
}
