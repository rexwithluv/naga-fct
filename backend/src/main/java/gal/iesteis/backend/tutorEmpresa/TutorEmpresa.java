package gal.iesteis.backend.tutorEmpresa;

import gal.iesteis.backend.empresa.Empresa;
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
@Table(name = "tutores_empresa")
public class TutorEmpresa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false, foreignKey = @ForeignKey(name = "fk_tutores_empresa"))
    private Empresa empresa;

    @Column(name = "nombre", length = 500, nullable = false)
    private String nombre;

    @Column(name = "apellidos", length = 500, nullable = false)
    private String apellidos;

    @Column(name = "email", length = 500, nullable = false)
    private String email;

    @Column(name = "telefono", length = 500, nullable = false)
    private String telefono;
}
