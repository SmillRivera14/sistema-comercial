using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Sistema_comercial.Models;

public partial class Producto
{
    [BindNever]
    public int Id { get; set; }

    [Required(ErrorMessage = "El Nombre del producto es requerido")]
    public string Nombre { get; set; } = null!;

    public string? Descripcion { get; set; }

    [Required(ErrorMessage = "El precio del producto es requerido")]
    [Range(0, int.MaxValue)]
    public decimal Precio { get; set; }

    [Required(ErrorMessage ="El producto requiere de una cantidad de stock")]
    [Range(0, int.MaxValue)]
    public int Stock { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime FechaUltimaActualizacion { get; set; }

    public string? URL { get; set; } 

}
